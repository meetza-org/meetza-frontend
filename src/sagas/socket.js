import { takeEvery, call, fork, put, take, select } from 'redux-saga/effects'
import SOCKET from '../action_types/socket';
import ROOM from '../action_types/room'
import { eventChannel } from 'redux-saga'

    function createSocketChannel(socket) {
        // `eventChannel` takes a subscriber function
        // the subscriber function takes an `emit` argument to put messages onto the channel
        return eventChannel(emit => {
    
        const msgHandler = (event) => {
            // puts event payload into the channel
            // this allows a Saga to take this payload from the returned channel
            console.log("########### Channel Msg ##############");
            console.log(event);
            console.log("######################################");
            emit(event)
        }

        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }
        socket.on('establish-connections', msgHandler)
        socket.on('error', errorHandler)
        // setup the subscription
        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off('message', msgHandler)
        }
    
        return unsubscribe
        })
    }

    export function* watchSendSignal() {
        yield takeEvery([SOCKET.SEND_SIGNAL.LOAD], function*(action) {
            const state = yield select();
            const socket = state.app.socket;
            console.log("########### New Signal ###############");
            console.log(action.data);
            console.log("######################################");
            socket.emit("signal", action.data);
        })
    }

    export function* watchSocketServer() {
        yield takeEvery([SOCKET.INITIALIZE_SOCKET.SUCCESS], function*(action){
            const state = yield select();
            const socketChannel = yield call(createSocketChannel, state.app.socket);
            while (true) {
                try {
                  // An error from socketChannel will cause the saga jump to the catch block
                  const payload = yield take(socketChannel)
                   yield fork(handlePayload, payload) 
                } catch(err) {
                  console.error('socket error:', err)
                  // socketChannel is still open in catch block
                  // if we want end the socketChannel, we need close it explicitly
                  socketChannel.close()
                }
            }
        })
    }

    export function* handlePayload(payload){
        switch(payload.type){
            case "video-offer": {
                yield put({ type: SOCKET.VIDEO_OFFER.SUCCESS, payload })
                break;
            }
            case "video-answer": {
                yield put({ type: SOCKET.VIDEO_ANSWER.SUCCESS, payload })
                break;
            }
            case "new-ice-candidate": {
                yield put({ type: SOCKET.NEW_ICE_CANDIDATE.SUCCESS, payload })
                break;
            }
            case "room-created": {
                yield put({ type: ROOM.INITIALIZE_ROOM.SUCCESS, payload })
                break;
            }
            case "started-meeting":{
                yield put({ type: ROOM.MEETING_STARTED.SUCCESS, payload })
                break;
            }
            case "joined-room":{
                yield put({ type: ROOM.JOINED_ROOM.SUCCESS, payload })
                break;
            }
            case "join-request":{
                yield put({ type: ROOM.JOIN_REQUEST.SUCCESS, payload })
                break;
            }
            case "accept-or-reject":{
                yield put({ type: ROOM.ACCEPT_REJECT.SUCCESS, payload })
                break;
            }
            case "close-meeting":{
                yield put({ type: ROOM.CLOSE_MEETING.SUCCESS, payload })
                break;
            }
            default:{
                console.log("Default Case")
            }
        }
    }

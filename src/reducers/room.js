import SOCKET from '../action_types/socket';
import ROOM from '../action_types/room'

const initialState = {
    videoOffer: null,
    videoAnswer: null,
    iceCandidate:null,
    roomCreated: false,
    roomId: null,
    isMeetingStarted: false,
    joinRequest:null,
    isWaiting: false,
    acceptOrReject: null,
    newJoinee: null,
    isMeetingClosed: false,
}

const room = (state = initialState, action) => {
    switch(action.type){
        case SOCKET.VIDEO_OFFER.SUCCESS:
            debugger;
            return {
                ...state,
                videoOffer: action.payload,
            };
        case SOCKET.VIDEO_ANSWER.SUCCESS:
            return {
                ...state,
                videoAnswer: action.payload,
            };
        case SOCKET.NEW_ICE_CANDIDATE.SUCCESS:
            return {
                ...state,
                iceCandidate: action.payload,
            }
        case ROOM.INITIALIZE_ROOM.SUCCESS:
            return {
                ...state,
                roomCreated: true,
                roomId: action.payload.roomId
            }
        case ROOM.MEETING_STARTED.SUCCESS:
            return {
                ...state,
                isMeetingStarted: true,
            }
        case ROOM.PERMISSIONS.SUCCESS: 
            return {
                ...state,
                isMeetingStarted: action.payload.isStarted,
            }
        case ROOM.JOIN_REQUEST.SUCCESS:
            return {
                ...state,
                joinRequest: action.payload,
            }
        case SOCKET.SEND_SIGNAL.LOAD:{
            if(action.data.type === "join-request"){
                return {
                    ...state,
                    isWaiting: true,
                }
            }
            return state;
        }
        case ROOM.ACCEPT_REJECT.SUCCESS: {
            return {
                ...state,
                isWaiting: false,
                acceptOrReject: action.payload,
            }
        }
        case ROOM.JOINED_ROOM.SUCCESS:{
            return {
                ...state,
                newJoinee: action.payload,
            }
        }
        case ROOM.CLOSE_MEETING.SUCCESS:{
            return {
                ...state,
                isMeetingClosed: true,
            }
        }
        default:{
            return state;
        }
    }
}

export default room;
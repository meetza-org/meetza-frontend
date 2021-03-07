import SOCKET from '../action_types/socket';

export const sendSignal = data => ({
    type: SOCKET.SEND_SIGNAL.LOAD,
    data: data
});

export const initializeSocket = data => ({
    type: SOCKET.INITIALIZE_SOCKET.SUCCESS,
    data: data
})
import SOCKET from '../action_types/socket';

const initialState = {
    socket : null,
}

const app = (state = initialState, action) => {
    switch(action.type){
        case SOCKET.INITIALIZE_SOCKET.SUCCESS:
            return {
                ...state,
                socket: action.data,
            };
        default:{
            return state;
        }
    }
}

export default app;
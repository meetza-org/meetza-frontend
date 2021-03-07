import SOCKET from '../action_types/socket';

const initialState = {
    videoOffer: null,
    videoAnswer: null,
    iceCandidate:null,
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
        default:{
            return state;
        }
    }
}

export default room;
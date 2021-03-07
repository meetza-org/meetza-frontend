import { RSAA } from 'redux-api-middleware';
import ROOM from '../action_types/room';

export const initializeRoom = () => ({
    [RSAA] : {
        endpoint: 'room/initialize',
        method: 'GET',
        types: [
            ROOM.INITIALIZE_ROOM.LOAD,
            ROOM.INITIALIZE_ROOM.SUCCESS,
            ROOM.INITIALIZE_ROOM.FAIL
        ]
    }
});
import { RSAA } from 'redux-api-middleware';
import ROOM from '../action_types/room';

export const getRoomPermissions = roomId => ({
    [RSAA] : {
        endpoint: `room/permissions?roomId=${roomId}`,
        method: 'GET',
        types: [
            ROOM.PERMISSIONS.LOAD,
            ROOM.PERMISSIONS.SUCCESS,
            ROOM.PERMISSIONS.FAIL
        ]
    }
});
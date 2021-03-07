import io from 'socket.io-client';

export const createWebSocketConnection = (namespace) => {
    namespace = namespace ? namespace : '';
    const socket = io(`${process.env.REACT_APP_API_URL}/${namespace}`,{
        extraHeaders: {
            Authorization: localStorage.getItem('token')
        }   
    });
    return socket;
}
import io from 'socket.io-client';
import { SOCKET_URL } from '@/config.js';
const userType = localStorage.getItem("user_type");
const accessToken = localStorage.getItem("access_token");
const socket = io(SOCKET_URL +userType+"?token="+accessToken, {
    transports: ['websocket']
});
window.socket = socket;
socket.on('connect', function () {
    console.log("CONNECTED TO SOCKET");
});

socket.on('disconnect', function () {
    console.log("DISCONNECTED FROM SOCKET");
});
export default socket;
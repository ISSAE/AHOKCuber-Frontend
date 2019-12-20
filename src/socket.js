import io from 'socket.io-client';
import { SOCKET_URL } from '@/config.js';
export var socket = null;

export function initSocket() {
    const userType = localStorage.getItem("user_type");
    const accessToken = localStorage.getItem("access_token");
    socket = io(SOCKET_URL +userType+"?token="+accessToken, {
        path: "/CuberSocket/socket.io",
        transports: ['polling', 'websocket']
    });
    socket.on('connect', function () {
        console.log("CONNECTED TO SOCKET");
    });
    
    socket.on('disconnect', function () {
        socket = io(SOCKET_URL +userType+"?token="+accessToken, {
            path: "/CuberSocket/socket.io",
            transports: ['polling', 'websocket']
        });
        console.log("DISCONNECTED FROM SOCKET");
    });

    window.socket = socket;
    console.log("Socket init successful");
}

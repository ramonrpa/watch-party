import { io } from 'socket.io-client';
import React from 'react';

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false,
});
export const SocketContext = React.createContext(socket);

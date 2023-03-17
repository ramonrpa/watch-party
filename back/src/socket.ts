import { Socket } from 'socket.io';
import ClientManager from './manager/ClientManager';
import { clients } from './utils';

export const newConnection = (socket: Socket) => {
  const client = new ClientManager(socket);
  console.log('Nova conexão', { id: socket.id });
  clients[socket.id] = client;
};

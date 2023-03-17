import { Socket } from 'socket.io';

interface Client {
  id: string;
  name?: string;
  socket: Socket;
  roomId?: string;
  toJson: Function;
}

export type ClientJSON = {
  id: string;
  name: string;
};

export default Client;

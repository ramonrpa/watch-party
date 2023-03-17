import Client from './Client';
import Video from './Video';

interface Room {
  id: string;
  owner: Client;
  clients: Client[];
  video?: Video;
  password?: string;
  toJson: Function;
}

export type RoomJSON = {
  id: string;
  owner: { name?: string; id: string };
  video?: Video;
  clientCount: number;
};

export default Room;

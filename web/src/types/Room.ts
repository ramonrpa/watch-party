import Client from './Client';
import Video from './Video';

interface Room {
  id: string;
  owner: Client;
  clientCount: number;
  video?: Video;
}

export default Room;

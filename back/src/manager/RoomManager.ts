import Client from '~/types/Client';
import Room, { RoomJSON } from '~/types/Room';
import Video from '~/types/Video';
import { rooms } from '~/utils';

class RoomManager implements Room {
  id: string;
  owner: Client;
  clients: Client[];
  video?: Video;
  password?: string | undefined;

  constructor(id: string, owner: Client, password?: string) {
    this.id = id;
    this.owner = owner;
    this.clients = [];
    this.password = password;
  }

  getClient = (id: string): Client | undefined => {
    return this.clients.find((client: Client) => client.id === id);
  };

  addClient = (client: Client) => {
    this.clients.push(client);
    this.emitToAll('message', {
      type: 'join',
      author: client.toJson(),
    });
    this.updateRoomToAll();
  };

  removeClient = (client: Client) => {
    this.clients = this.clients.filter((item: Client) => item.id !== client.id);

    if (this.clients.length === 0) {
      delete rooms[this.id];
      return;
    }
    this.emitToAll('message', {
      type: 'leave',
      author: client.toJson(),
    });
    if (this.owner.id === client.id) this.newOwner();
    this.updateRoomToAll();
  };

  newOwner = () => {
    this.owner = this.clients[0];
    this.emitToAll('message', {
      type: 'newOwner',
      author: this.owner.toJson(),
    });
  };

  playVideo = (time: number) => {
    if (this.video) {
      this.video.playing = true;
      this.video.currentTime = time;
      this.owner.socket.to(this.id).emit('playVideo', time);
      this.owner.socket.emit('playVideo', time);
      console.log('playVideo', { room: this.id, video: this.video });
    }
  };

  pauseVideo = (time: number) => {
    if (this.video) {
      this.video.playing = false;
      this.video.currentTime = time;
      this.owner.socket.to(this.id).emit('pauseVideo', time);
      this.owner.socket.emit('pauseVideo', time);
      console.log('pauseVideo', { room: this.id, video: this.video });
    }
  };

  seekVideo = (time: number) => {
    if (this.video) {
      this.video.currentTime = time;
      this.owner.socket.to(this.id).emit('seekVideo', time);
      this.owner.socket.emit('seekVideo', time);
      console.log('seekVideo', { room: this.id, video: this.video });
    }
  };

  updateRoomToClient = (client: Client) => {
    const room: RoomJSON = this.toJson();
    client.socket.emit('updateRoom', room);
  };

  updateRoomToAll = () => {
    const room: RoomJSON = this.toJson();
    this.owner.socket.to(this.id).emit('updateRoom', room);
    this.owner.socket.emit('updateRoom', room);
  };

  getClientByName = (name: string): Client | undefined => {
    return this.clients.find(
      (client) => client.name.toLowerCase() === name.toLowerCase(),
    );
  };

  emitToAll = (channel: string, data: Object) => {
    this.owner.socket.to(this.id).emit(channel, data);
    this.owner.socket.emit(channel, data);
  };

  toJson = (): RoomJSON => {
    return {
      id: this.id,
      owner: this.owner.toJson(),
      video: this.video,
      clientCount: this.clients.length,
    };
  };
}

export default RoomManager;

import { Socket } from 'socket.io';
import Client, { ClientJSON } from '~/types/Client';
import { clients, generateId, rooms } from '~/utils';
import RoomManager from './RoomManager';

class ClientManager implements Client {
  id: string;
  name?: string;
  socket: Socket;
  roomId?: string;

  constructor(socket: Socket) {
    const { id } = socket;
    this.id = id;
    this.socket = socket;
    socket.on('message', this.newMessage);
    socket.on('joinRoom', this.joinRoom);
    socket.on('createRoom', this.createRoom);
    socket.on('leaveRoom', this.leaveRoom);
    socket.on('setVideoUrl', this.setVideoUrl);
    socket.on('pauseVideo', this.pauseVideo);
    socket.on('playVideo', this.playVideo);
    socket.on('seekVideo', this.seekVideo);
    socket.on('syncVideo', this.syncVideo);
    socket.on('disconnect', this.disconnect);
  }

  setVideoUrl = async (url: string) => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];

    room.video = {
      url,
      playing: false,
      currentTime: 0,
    };

    console.log('setVideoUrl', { room: room.id, video: room.video });
    room.emitToAll('updateVideo', room.video);
  };

  syncVideo = (playing: boolean, time: number) => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];

    if (room.video) {
      room.video.playing = playing;
      room.video.currentTime = time;
    }
  };

  pauseVideo = (time: number) => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];

    room.pauseVideo(time);
  };

  playVideo = (time: number) => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];

    room.playVideo(time);
  };

  seekVideo = (time: number) => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];

    room.seekVideo(time);
  };

  joinRoom = (nickName: string, id: string): boolean => {
    const room: RoomManager | undefined = rooms[id];

    if (!room) return this.error('error', 'Sala inexistente.', 404);
    if (room.getClientByName(nickName))
      return this.error('error', 'Nome já em uso.', 409);

    this.roomId = id;
    this.name = nickName;
    this.socket.join(id);
    room.addClient(this);
    console.log('joinRoom', { room: room.id, member: this.toJson() });
    this.success('joinRoom', { id, name: nickName });
  };

  createRoom = (nickName: string, id: string): boolean => {
    if (!id) id = generateId();
    if (rooms[id])
      return this.error('error', 'Código de sala já registrado.', 404);

    const room: RoomManager = new RoomManager(id, this);
    rooms[id] = room;
    this.roomId = id;
    this.name = nickName;
    this.socket.join(id);
    room.addClient(this);
    console.log('createRoom', { room: room.id, member: this.toJson() });
    this.success('createRoom', {
      id,
      name: nickName,
      room: room.toJson(),
    });
  };

  leaveRoom = (): boolean => {
    if (!this.roomId)
      return this.error('error', 'Você precisa estar em uma sala.', 404);

    const room: RoomManager | undefined = rooms[this.roomId];
    this.socket.leave(this.roomId);
    room.removeClient(this);
    this.roomId = undefined;
    console.log('leaveRoom', { room: room.id, member: this.toJson() });
    this.success('leaveRoom', 'Desconectado com sucesso.');
  };

  disconnect = () => {
    if (this.roomId) {
      const room: RoomManager = rooms[this.roomId];
      room.removeClient(this);
    }
    delete clients[this.id];
    this.socket.removeAllListeners();
    console.log('Desconectado', this.toJson());
  };

  newMessage = (message: string) => {
    if (!this.roomId)
      return this.error(
        'error',
        'Você precisa estar em uma sala para mandar mensagens.',
        404,
      );

    const room: RoomManager = rooms[this.roomId];
    room.emitToAll('message', {
      type: 'text',
      content: message,
      author: this.toJson(),
    });
  };

  emit = (channel: string, ...args: any[]) => {
    return this.socket.emit(channel, ...args);
  };

  error = (channel: string, error: string, code = 500) => {
    return this.emit(channel, { code, error });
  };

  success = (channel: string, data: Object, code = 200) => {
    return this.emit(channel, { code, data });
  };

  toJson = (): ClientJSON => {
    return { name: this.name || '', id: this.id };
  };
}

export default ClientManager;

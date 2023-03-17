import ClientManager from './manager/ClientManager';
import RoomManager from './manager/RoomManager';

export const clients: { [key: string]: ClientManager } = {};
export const rooms: { [key: string]: RoomManager } = {};

export const generateId = (): string => {
  return `${Math.random().toString(36).substring(2, 8)}`;
};

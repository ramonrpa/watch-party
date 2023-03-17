interface Message {
  type: 'text' | 'join' | 'leave' | 'newOwner';
  content?: string;
  author: {
    id: string;
    name: string;
  };
}

export default Message;

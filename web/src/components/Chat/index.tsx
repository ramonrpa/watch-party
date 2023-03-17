import { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '~/context/socket';
import { useAppSelector } from '~/store/hooks';
import Message from './Message';
import { Container, InputContainer, MessageList } from './styles';

const Chat = () => {
  const { chat, user } = useAppSelector((state) => state);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState<string>('');
  const messageListRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scroll({
      behavior: 'smooth',
      top: messageListRef.current.scrollHeight,
    });
  }, [chat]);

  const sendMessage = () => {
    if (message.length > 0) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <Container>
      <MessageList ref={messageListRef}>
        {chat.map((message, index) => (
          <Message
            key={index}
            {...message}
            isMe={user.id === message.author.id}
          />
        ))}
      </MessageList>
      <InputContainer>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          onKeyPress={({ key }) => key === 'Enter' && sendMessage()}
        />
        <span className="material-icons" onClick={sendMessage}>
          send
        </span>
      </InputContainer>
    </Container>
  );
};

export default Chat;

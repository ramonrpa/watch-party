import React from 'react';
import IMessage from '~/types/Message';
import { Container, Content, Author } from './styles';

const Message: React.FC<IMessage & { isMe: boolean }> = ({
  type,
  content,
  author,
  isMe,
}) => (
  <Container type={type} isMe={isMe}>
    <Content>
      {type === 'text'
        ? content
        : type === 'newOwner'
        ? `${isMe ? 'Você' : author.name} se tornou o novo dono da sala.`
        : type === 'join'
        ? `${isMe ? 'Você' : author.name} entrou na sala.`
        : `${author.name} saiu da sala.`}
    </Content>
    {type === 'text' && <Author>{isMe ? 'Você' : author.name}</Author>}
  </Container>
);

export default Message;

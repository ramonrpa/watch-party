import { Fragment, useCallback, useContext, useMemo, useState } from 'react';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { SocketContext } from '~/context/socket';
import { useAppSelector } from '~/store/hooks';
import { H3 } from '~/styles/typography';
import {
  Card,
  Container,
  InputContainer,
  InputList,
  Logo,
  SwitchText,
} from './styles';

const Home = () => {
  const socket = useContext(SocketContext);
  const { user, loading } = useAppSelector((state) => state);
  const [nickname, setNickname] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [state, setState] = useState<'create' | 'join'>('join');

  const createRoom = useCallback(() => {
    socket.emit('createRoom', nickname, roomId);
  }, [nickname, roomId, socket]);

  const joinRoom = useCallback(() => {
    socket.emit('joinRoom', nickname, roomId);
  }, [nickname, roomId, socket]);

  const renderJoinForm = useMemo(
    () => (
      <Fragment>
        <Logo />
        <H3 type="bold" textTransform="uppercase" color="#000">
          Conectar a uma sala
        </H3>
        <InputList>
          <InputContainer>
            <label htmlFor="nickname">Nome</label>
            <input
              type="text"
              id="nickname"
              placeholder="Digite seu nome..."
              value={nickname}
              onChange={({ target }) => setNickname(target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="roomId">Código da sala</label>
            <input
              type="text"
              id="roomId"
              placeholder="Digite o código da sala..."
              value={roomId}
              onChange={({ target }) => setRoomId(target.value.toUpperCase())}
            />
          </InputContainer>
        </InputList>
        <Button
          onClick={joinRoom}
          disabled={nickname.length < 3 || roomId.length < 3 || loading}
        >
          Conectar
        </Button>
        <SwitchText>
          Crie sua propria sala
          <b onClick={() => setState('create')}> clicando aqui</b>.
        </SwitchText>
      </Fragment>
    ),
    [joinRoom, loading, nickname, roomId],
  );

  const renderCreateForm = useMemo(
    () => (
      <Fragment>
        <Logo />
        <H3 type="bold" textTransform="uppercase" color="#000">
          Criar sua sala
        </H3>
        <InputList>
          <InputContainer>
            <label htmlFor="nickname">Nome</label>
            <input
              type="text"
              id="nickname"
              placeholder="Digite seu nome..."
              value={nickname}
              onChange={({ target }) => setNickname(target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="roomId">Código da sala</label>
            <input
              type="text"
              id="roomId"
              placeholder="Digite o código da sala..."
              value={roomId}
              onChange={({ target }) => setRoomId(target.value.toUpperCase())}
            />
          </InputContainer>
        </InputList>
        <Button
          onClick={createRoom}
          disabled={nickname.length < 3 || roomId.length < 3 || loading}
        >
          Criar
        </Button>
        <SwitchText>
          Conecte a uma sala existente
          <b onClick={() => setState('join')}> clicando aqui</b>.
        </SwitchText>
      </Fragment>
    ),
    [createRoom, loading, nickname, roomId],
  );

  return user.connected ? (
    <Container>
      <Card>{state === 'create' ? renderCreateForm : renderJoinForm}</Card>
    </Container>
  ) : (
    <Loading />
  );
};

export default Home;

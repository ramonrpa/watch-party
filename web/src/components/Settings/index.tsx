import { Section, Container } from './styles';
import { H4, Paragraph } from '~/styles/typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addToast } from '~/store/reducers/toasts.reducer';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '~/context/socket';

const Settings = () => {
  const dispatch = useAppDispatch();
  const { room, user } = useAppSelector((state) => state);
  const socket = useContext(SocketContext);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setVideoUrl(room.video?.url);
  }, [room.video]);

  return (
    <Container>
      <Section>
        <H4>Convide seus amigos</H4>
        <Paragraph color="#eee">Código da sala:</Paragraph>
        <span>
          <input id="code" defaultValue={room.id} readOnly />
          <button
            onClick={() => {
              navigator.clipboard.writeText(room.id);
              dispatch(
                addToast({
                  description:
                    'O código da sala foi copiado para sua área de transferência.',
                  type: 'success',
                }),
              );
            }}
          >
            <span className="material-icons">content_copy</span> Copiar código
          </button>
        </span>
      </Section>
      <Section>
        <H4>Configurações da Sala</H4>
        <Paragraph color="#eee">Url do vídeo:</Paragraph>
        <span>
          <input
            id="code"
            value={videoUrl}
            onChange={({ target }) => setVideoUrl(target.value)}
            readOnly={room.owner.id !== user.id}
            placeholder="Digite a url do video..."
          />
          {room.owner.id === user.id && (
            <button
              onClick={() => {
                socket.emit('setVideoUrl', videoUrl);
              }}
            >
              <span className="material-icons">link</span> Definir
            </button>
          )}
        </span>
      </Section>
      <Section>
        <H4>Detalhes da Sala</H4>
        <Paragraph color="#eee">
          {room.clientCount} pessoas participando.
        </Paragraph>
      </Section>
    </Container>
  );
};

export default Settings;

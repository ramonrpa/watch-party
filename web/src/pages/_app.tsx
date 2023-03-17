import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Toasts from '~/components/Toasts';
import { socket, SocketContext } from '~/context/socket';
import useInterval from '~/hooks/useInterval';
import store from '~/store';
import { addMessage, clearMessages } from '~/store/reducers/chat.reducer';
import { setLoading } from '~/store/reducers/loading.reducer';
import {
  setClientCount,
  setRoom,
  setVideo,
} from '~/store/reducers/room.reducer';
import { addToast } from '~/store/reducers/toasts.reducer';
import {
  setConnected,
  setId,
  setName,
  setRoomId,
} from '~/store/reducers/user.reducer';
import { GlobalStyles } from '~/styles/global';
import { theme } from '~/styles/theme';

function App({ Component, pageProps }: AppProps) {
  const { dispatch } = store;

  useEffect(() => {
    socket.on('connect', () => {
      dispatch(setId(socket.id));
      dispatch(setConnected(true));
    });
    socket.on('joinRoom', ({ data: { id, name } }) => {
      dispatch(setName(name));
      dispatch(setRoomId(id));
      dispatch(setLoading(false));
      Router.replace('/room');
    });
    socket.on('createRoom', ({ data: { id, name, room } }) => {
      dispatch(setName(name));
      dispatch(setRoomId(id));
      dispatch(setRoom(room));
      dispatch(setLoading(false));
      Router.replace('/room');
    });
    socket.on('updateRoom', (room) => {
      dispatch(setRoom(room));
    });
    socket.on('updateClients', (count) => {
      dispatch(setClientCount(count));
    });
    socket.on('updateVideo', (video) => {
      dispatch(setVideo(video));
    });
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('error', ({ error }) => {
      dispatch(
        addToast({
          type: 'error',
          description: error,
        }),
      );
      dispatch(setLoading(false));
    });
    socket.on('connect_error', (err) => {
      dispatch(setId(undefined));
      dispatch(setName(undefined));
      dispatch(setRoomId(undefined));
      dispatch(setConnected(false));
      dispatch(setLoading(false));
      dispatch(
        setRoom({
          id: undefined,
          owner: undefined,
          clientCount: 0,
        }),
      );
      dispatch(clearMessages());
      dispatch(
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao se conectar.',
          description: err.message,
        }),
      );
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch]);

  useInterval(() => {
    socket.emit('ping', new Date());
  }, 1000);

  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Toasts />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SocketContext.Provider>
  );
}

export default App;

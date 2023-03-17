import Router from 'next/router';
import { useEffect, useState } from 'react';
import Chat from '~/components/Chat';
import Settings from '~/components/Settings';
import Player from '~/components/Player';
import { useAppSelector } from '~/store/hooks';
import {
  Container,
  HideShow,
  TabContainer,
  TabContent,
  TabHeader,
  TabItem,
} from './styles';

const Rooms = () => {
  const { user } = useAppSelector((state) => state);
  const [showTabs, setShowTabs] = useState<boolean>(true);
  const [tab, setTab] = useState<'chat' | 'settings'>('chat');

  useEffect(() => {
    if (!user.roomId || !user.connected) Router.replace('/');
  }, [user]);

  return (
    <Container>
      <Player />
      <HideShow onClick={() => setShowTabs(!showTabs)} showTabs={showTabs}>
        <span className="material-icons">
          {showTabs
            ? 'keyboard_double_arrow_right'
            : 'keyboard_double_arrow_left'}
        </span>
        <p>{showTabs ? 'Esconder' : 'Mostrar'}</p>
      </HideShow>
      <TabContainer show={showTabs}>
        <TabHeader>
          <TabItem active={tab === 'chat'} onClick={() => setTab('chat')}>
            Bate-papo
          </TabItem>
          <TabItem
            active={tab === 'settings'}
            onClick={() => setTab('settings')}
          >
            Configurações
          </TabItem>
        </TabHeader>
        <TabContent>
          {tab === 'chat' && <Chat />}
          {tab === 'settings' && <Settings />}
        </TabContent>
      </TabContainer>
    </Container>
  );
};

export default Rooms;

import React, {
  useRef,
  useState,
  Fragment,
  useContext,
  useEffect,
} from 'react';
import ReactPlayer from 'react-player';
import { SocketContext } from '~/context/socket';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setPlaying } from '~/store/reducers/room.reducer';
import Controls from './Controls';
import { AwaitMessage, Container } from './styles';

const Player = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const { room, user } = useAppSelector((state) => state);
  const [volume, setVolume] = useState<number>(100);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const ref = useRef<ReactPlayer>();

  useEffect(() => {
    socket.on('playVideo', (time: number) => {
      seekTo(time);
      play();
      dispatch(setPlaying(true));
    });
    socket.on('pauseVideo', (time: number) => {
      seekTo(time);
      pause();
      dispatch(setPlaying(false));
    });
    socket.on('seekVideo', (time: number) => {
      seekTo(time);
    });

    return () => {
      socket.removeAllListeners('playVideo');
      socket.removeAllListeners('pauseVideo');
      socket.removeAllListeners('seekVideo');
    };
  }, [dispatch, room.owner, socket, user.id]);

  const play = () => {
    const player = ref.current?.getInternalPlayer();
    if (!player) return;
    if (player.playVideo) player.playVideo();
    else player.play();
  };

  const pause = () => {
    const player = ref.current?.getInternalPlayer();
    if (!player) return;
    if (player.pauseVideo) player.pauseVideo();
    else player.pause();
  };

  const seekTo = (time: number) => {
    ref.current?.seekTo(time, 'seconds');
  };

  return (
    <Container>
      {room.video?.url ? (
        <Fragment>
          <ReactPlayer
            width="100%"
            height="100%"
            url={room.video?.url}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  disablekb: 1,
                  playsinline: 1,
                  cc_load_policy: 1,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  autohide: 1,
                },
              },
              soundcloud: {
                options: {
                  buying: false,
                  sharing: false,
                  download: false,
                  show_artwork: false,
                  show_playcount: false,
                  show_user: false,
                },
              },
              twitch: {
                options: {
                  controls: false,
                },
              },
            }}
            ref={ref}
            onProgress={({ playedSeconds }) => {
              setCurrentTime(playedSeconds);
              if (room.owner.id !== user.id) return;
              socket.emit('syncVideo', room.video.playing, currentTime);
            }}
            onDuration={(duration) => setTotalTime(duration)}
            onReady={() => {
              if (room.video.currentTime === 0) return;
              seekTo(room.video.currentTime);
              room.video.playing ? play() : pause();
              dispatch(setPlaying(room.video.playing));
            }}
            volume={volume / 100}
          />
          <Controls
            currentTime={currentTime}
            totalTime={totalTime || 1}
            volume={volume}
            playing={room.video.playing}
            onSeek={(seconds) => {
              socket.emit('seekVideo', seconds);
            }}
            onPlay={() => {
              socket.emit('playVideo', currentTime);
            }}
            onPause={() => {
              socket.emit('pauseVideo', currentTime);
            }}
            onVolume={(volume: number) => setVolume(volume)}
          />
        </Fragment>
      ) : (
        <AwaitMessage>Aguardando a seleção de um vídeo.</AwaitMessage>
      )}
    </Container>
  );
};

export default Player;

import React, { useRef, useState } from 'react';
import {
  Container,
  Row,
  LeftContainer,
  CenterContainer,
  RightContainer,
} from './styles';
import Range from '~/components/InputRange';
import { useAppSelector } from '~/store/hooks';

interface Props {
  currentTime: number;
  totalTime: number;
  volume: number;
  playing: boolean;
  onSeek: (time: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onVolume: (volume: number) => void;
}

const Controls: React.FC<Props> = ({
  currentTime,
  totalTime,
  volume,
  playing,
  onSeek,
  onPlay,
  onPause,
  onVolume,
}) => {
  const { room, user } = useAppSelector((state) => state);
  const [fullScreen, setFullScreen] = useState<boolean>(
    !!document.fullscreenElement,
  );
  const [show, setShow] = useState<boolean>(true);
  const timeoutRef = useRef<ReturnType<typeof setInterval>>();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  const parseTime = (seconds: number): string => {
    seconds = Math.floor(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    return `${hours ? `${parseZero(hours)}:` : ''}${parseZero(
      minutes,
    )}:${parseZero(seconds % 60)}`;
  };

  const parseZero = (number: number): string => {
    if (number < 10) return `0${number}`;

    return String(number);
  };

  const handleShow = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    setShow(true);
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 4000);
  };

  return (
    <Container
      show={!playing || show}
      onMouseEnter={handleShow}
      onMouseMove={handleShow}
    >
      {totalTime !== Infinity && (
        <Range
          value={currentTime}
          min={0}
          max={totalTime}
          onChange={({ target }) => onSeek(Number(target.value))}
          disabled={room.owner.id !== user.id}
        />
      )}
      <Row>
        <LeftContainer>
          <span className="material-icons">
            {volume > 50
              ? 'volume_up'
              : volume > 0
              ? 'volume_down'
              : 'volume_off'}
          </span>
          <Range
            value={volume}
            min={0}
            max={100}
            onChange={({ target }) => onVolume(Number(target.value))}
          />
        </LeftContainer>
        <CenterContainer>
          {totalTime !== Infinity && <p>{parseTime(currentTime)}</p>}
          <button
            className="material-icons"
            onClick={() => (playing ? onPause() : onPlay())}
            disabled={room.owner.id !== user.id}
          >
            {playing ? 'pause' : 'play_arrow'}
          </button>
          {totalTime !== Infinity && <p>{parseTime(totalTime)}</p>}
        </CenterContainer>
        <RightContainer>
          <button className="material-icons" onClick={toggleFullScreen}>
            {fullScreen ? 'fullscreen_exit' : 'fullscreen'}
          </button>
        </RightContainer>
      </Row>
    </Container>
  );
};

export default Controls;

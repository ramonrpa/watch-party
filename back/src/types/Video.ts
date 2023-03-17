export interface Quality {
  quality: string;
  url: string;
}

interface Video {
  url: string;
  currentTime: number;
  playing: boolean;
}

export default Video;

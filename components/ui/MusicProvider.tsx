import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";

export type Song = {
  id: number;
  title: string;
  artist: string;
  file: any;
  image: any;
  lyrics?: string;
};

type MusicContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  songs: Song[];
  playSong: (song: Song) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  nextSong: () => Promise<void>;
  prevSong: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
};

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1);
  const soundRef = useRef<Audio.Sound | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: "American Idiot",
      artist: "Green Day",
      file: require("@/assets/music/american_idiot.mp3"),
      image: require("@/assets/images/gd.png"),
      lyrics: "Don't wanna be an American idiot \nDon't want a nation under the new mania \nAnd can you hear the sound of hysteria? \nThe subliminal mindfuck America \n \nWelcome to a new kind of tension \nAll across the alienation \nWhere everything isn't meant to be okay \n In television dreams of tomorrow \nWe're not the ones who're meant to follow \nFor that's enough to argue \nWell, maybe I'm the faggot, America \nI'm not a part of a redneck agenda \nNow everybody, do the propaganda \nAnd sing along to the age of paranoia \nWelcome to a new kind of tension \n \n All across the alienation \n Where everything isn't meant to be okay \nIn television dreams of tomorrow \nWe're not the ones who're meant to follow \nFor that's enough to argue \n \nDon't wanna be an American idiot \nOne nation controlled by the media \nInformation age of hysteria \nIt's calling out to idiot America \n \nWelcome to a new kind of tension \nAll across the alienation \nWhere everything isn't meant to be okay \nIn television dreams of tomorrow \nWe're not the ones who're meant to follow \nFor that's enough to argue",
    },
    {
      id: 2,
      title: "Corazón Espinado",
      artist: "Santana ft. Maná",
      file: require("@/assets/music/corazon_espinado.mp3"),
      image: require("@/assets/images/CES.png"),
      lyrics: "Esa mujer me está matando\nMe ha espinado el corazón\nPor más que trato de olvidarla\nMi alma no da razón\n\n Mi corazón aplastado\n Dolido y abandonado\n A ver, a ver, tú sabes, dime, mi amor\n Cuánto amor y qué dolor nos quedó\n\n¡Ay, corazón espinado! \n (¡Cómo duele, me duele, mamá!) \n¡Ay, cómo me duele el amor! \n\nY cómo duele, cómo duele el corazón\nCuando uno es bien entregado\n Pero no olvides, mujer, que algún día dirás\n¡Ay, ay, ay! ¡Cómo me duele el amor! \n\n¡Ay, corazón espinado! \n(¡Cómo duele, me duele, mamá!) \n¡Ay, cómo me duele el amor! \n¡Ay, corazón espinado! \n¡Ay, cómo me duele el amor! \nCómo me duele el olvido\nCómo duele el corazón\n Cómo me duele el estar vivo\nSin tenerte a un lado, amor\n\nCorazón espinado\nCorazón espinado\nCorazón espinado\nCorazón espinado\n\n(Corazón espinado) \n(Corazón espinado) \n(Corazón espinado) \n(Corazón espinado)",
    },
    {
      id: 3,
      title: "Adventure of a Lifetime",
      artist: "Coldplay",
      file: require("@/assets/music/adventure_lifetime.mp3"),
      image: require("@/assets/images/CLDP.png"),
      lyrics: "Turn your magic on, to me she'd say — everything you want's a dream away...",
    },
    {
      id: 4,
      title: "Feel Good Inc.",
      artist: "Gorillaz",
      file: require("@/assets/music/feel_good_inc.mp3"),
      image: require("@/assets/images/FG.png"),
      lyrics: "City’s breaking down on a camel’s back, they just have to go 'cause they don’t know wack...",
    },
  ];

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  const playSong = async (song: Song) => {
    if (soundRef.current) await soundRef.current.unloadAsync();

    const { sound } = await Audio.Sound.createAsync(song.file, { shouldPlay: true });
    soundRef.current = sound;
    setCurrentSong(song);
    setIsPlaying(true);

    const status = await sound.getStatusAsync();
    if ("durationMillis" in status && status.durationMillis) {
      setDurationMillis(status.durationMillis);
    }

    sound.setOnPlaybackStatusUpdate((status) => {
      if ("positionMillis" in status) setPositionMillis(status.positionMillis);
      if ("durationMillis" in status && status.durationMillis)
        setDurationMillis(status.durationMillis);
      if ("didJustFinish" in status && status.didJustFinish) nextSong();
    });
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if ("isPlaying" in status && status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else if ("isPlaying" in status) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const nextSong = async () => {
    if (!currentSong) return;
    const nextIndex = currentSong.id % songs.length;
    await playSong(songs[nextIndex]);
  };

  const prevSong = async () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (positionMillis > 5000) {
      await playSong(songs[currentIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      await playSong(songs[prevIndex]);
    }
  };

  const seekTo = async (millis: number) => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.setPositionAsync(millis);
      setPositionMillis(millis);
    } catch (e) {
      console.warn("Error seeking:", e);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        positionMillis,
        durationMillis,
        songs,
        playSong,
        togglePlayPause,
        nextSong,
        prevSong,
        seekTo,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within MusicProvider");
  return context;
};

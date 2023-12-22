import { Card, Text } from "@mantine/core";

export interface Song {
  title: string;
  album: string;
  artist: string;
}

interface SongCardProps {
  song: Song;
  style?: React.CSSProperties;
}

const SongCard: React.FC<SongCardProps> = ({ song, style }) => {
  return (
    <Card shadow="xs" style={style}>
      <Text fw={500}>{song.title}</Text>
      <Text c="dimmed">{song.album}</Text>
      <Text c="dimmed">{song.artist}</Text>
    </Card>
  );
};

export default SongCard;

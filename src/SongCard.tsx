import { Card, Text } from "@mantine/core";
import React from "react";

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
      <Text fw={500} lineClamp={1}>
        {song.title}
      </Text>
      <Text c="dimmed" lineClamp={1}>
        {song.album}
      </Text>
      <Text c="dimmed" lineClamp={1}>
        {song.artist}
      </Text>
    </Card>
  );
};

export default SongCard;

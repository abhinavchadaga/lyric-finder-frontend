import {
  Button,
  Center,
  Container,
  Grid,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconClearAll } from "@tabler/icons-react";
import { useState } from "react";
import InputWithButton from "./InputWithButton";
import SongCard, { Song } from "./SongCard";

const PAGE_SIZE = 6;

const App: React.FC = () => {
  const theme = useMantineTheme();
  const [results, setResults] = useState<Song[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const isResultsEmpty = results === null || results.length === 0;

  const searchForLyric = async (lyric: string, pageNumber: number = 1) => {
    fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lyric,
        page_number: pageNumber,
        page_size: PAGE_SIZE,
      }),
    })
      .then((res) => res.json())
      .then((data: { songs: Song[] }) => {
        const { songs } = data;
        setResults(songs);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearResults = () => {
    setInputValue("");
    setResults(null);
  };
  return (
    <>
      <Container>
        <Stack p={"md"} h={"50vh"} justify={"flex-end"} gap={"xl"}>
          <Center>
            <Title>Lyric Finder</Title>
          </Center>
          <InputWithButton
            placeholder="Search lyrics..."
            value={inputValue}
            searchForLyric={searchForLyric}
            setInputValue={setInputValue}
          />
        </Stack>
        <Stack p={"md"} h={"50vh"}>
          <Grid align="stretch">
            {results?.map((song: Song) => (
              <Grid.Col span={4}>
                <SongCard song={song} style={{ height: "100%" }} />
              </Grid.Col>
            ))}
          </Grid>
          {!isResultsEmpty && (
            <Center>
              <Button
                color={theme.colors.red[6]}
                variant="light"
                onClick={clearResults}
                rightSection={<IconClearAll size={16} />}
              >
                Clear
              </Button>
            </Center>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default App;

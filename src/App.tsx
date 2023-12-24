import {
  Button,
  Center,
  Container,
  Grid,
  Pagination,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { IconClearAll } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import InputWithButton from "./InputWithButton";
import SongCard, { Song } from "./SongCard";

const PAGE_SIZE = 6;

interface QueryResponseInfo {
  numResults: number;
  totalPages: number;
}

const App: React.FC = () => {
  const theme = useMantineTheme();
  const [results, setResults] = useState<Song[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const isResultsEmpty = results === null || results.length === 0;
  const responseInfo = useRef<QueryResponseInfo>({
    numResults: 0,
    totalPages: 0,
  });
  const pagination = usePagination({
    total: responseInfo.current.totalPages,
    initialPage: 1,
  });

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
      .then(
        (data: { songs: Song[]; num_results: number; total_pages: number }) => {
          const { songs, num_results, total_pages } = data;
          responseInfo.current = {
            numResults: num_results,
            totalPages: total_pages,
          };
          setResults(songs);
        },
      )
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
        <Stack h={"50vh"} justify={"flex-end"} gap={"xl"}>
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
          {results !== null && (
            <Title style={{ textAlign: "center" }} order={3}>
              Found {responseInfo.current.numResults} results
              {responseInfo.current.numResults === 0 && ":("}
            </Title>
          )}
          <Grid align="stretch">
            {results?.map((song: Song) => (
              <Grid.Col
                span={4}
                key={`${song.title}-${song.album}-${song.artist}`}
              >
                <SongCard song={song} style={{ height: "100%" }} />
              </Grid.Col>
            ))}
          </Grid>
          {!isResultsEmpty && (
            <div style={{ position: "relative" }}>
              <Center>
                <Pagination
                  total={responseInfo.current.totalPages}
                  value={pagination.active}
                  onChange={(value: number) => {
                    searchForLyric(inputValue, value);
                    pagination.setPage(value);
                  }}
                />
              </Center>
              <Button
                color={theme.colors.red[6]}
                variant="light"
                onClick={clearResults}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translateY(-50%)",
                }}
                rightSection={<IconClearAll size={16} />}
              >
                Clear
              </Button>
            </div>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default App;

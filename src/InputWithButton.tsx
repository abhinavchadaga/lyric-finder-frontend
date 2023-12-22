import {
  ActionIcon,
  TextInput,
  TextInputProps,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

interface InputWithButtonProps extends TextInputProps {
  searchForLyric: (lyric: string) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputWithButton: React.FC<InputWithButtonProps> = ({
  searchForLyric,
  setInputValue,
  ...props
}: InputWithButtonProps) => {
  const theme = useMantineTheme();

  const { value: inputValue } = props;
  const inputValueAsStr = String(inputValue);

  const controlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSearch = () => {
    searchForLyric(inputValueAsStr);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextInput
      radius="xl"
      size="md"
      rightSectionWidth={42}
      onChange={controlInput}
      onKeyDown={handleEnterKey}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={handleSearch}
        >
          <IconArrowRight
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      }
      {...props}
    />
  );
};

export default InputWithButton;

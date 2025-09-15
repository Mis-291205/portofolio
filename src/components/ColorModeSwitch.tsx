import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text whiteSpace="nowrap">
        <FaRegMoon />
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;

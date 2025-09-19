import {
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.svg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const textColor = useColorModeValue("black", "white");
  const numberColor = useColorModeValue("#00987a", "#57dfc2");
  const hoverBorderColor = useColorModeValue("#00987a", "#57dfc2");

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Resume", to: "/resume" },
  ];

  return (
    <HStack
      padding="10px"
      spacing={1.5}
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      mx={2}
    >
      <Image src={logo} boxSize="40px" borderRadius="md" />

      {isMobile ? (
        <Menu closeOnSelect>
          <MenuButton
            as={IconButton}
            icon={<GiHamburgerMenu />}
            variant="outline"
            aria-label="Menu"
            size="sm"
            ml="auto"
            mr={2}
          />
          <MenuList>
            {navItems.map((item, index) => (
              <MenuItem
                as={RouterLink}
                to={item.to}
                key={item.to}
                display="flex"
                alignItems="center"
                gap={2}
                _focus={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _hover={{ bg: "transparent" }}
              >
                <Text color={numberColor} fontWeight="bold">
                  {String(index + 1).padStart(2, "0")}.
                </Text>
                <Text color={textColor}>{item.label}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={2} ml="auto" mr={2}>
          {navItems.map((item, index) => (
            <Button
              key={item.to}
              as={RouterLink}
              to={item.to}
              size="sm"
              variant="outline"
              borderColor="transparent"
              _hover={{ borderColor: hoverBorderColor, bg: "transparent" }}
              color={textColor}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Text color={numberColor} fontWeight="bold">
                {String(index + 1).padStart(2, "0")}.
              </Text>
              <Text>{item.label}</Text>
            </Button>
          ))}
        </HStack>
      )}

      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;

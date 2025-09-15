import {
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.svg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  // cek apakah layar <= 450px
  const [isMobile] = useMediaQuery("(max-width: 450px)");

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <HStack
      padding="10px"
      spacing={1.5}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Logo */}
      <Image src={logo} boxSize="40px" borderRadius="md" />

      {/* Menu */}
      {isMobile ? (
        <Menu>
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
            {navItems.map((item) => (
              <MenuItem as={RouterLink} to={item.to} key={item.to}>
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={2} ml="auto" mr={2}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              as={RouterLink}
              to={item.to}
              size="sm"
              variant="outline"
              color={color}
              borderColor={borderColor}
              _hover={{ bg: hoverBg }}
            >
              {item.label}
            </Button>
          ))}
        </HStack>
      )}

      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;

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
import { Link as RouterLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.svg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const location = useLocation();

  const textColor = useColorModeValue("black", "white");
  const numberColor = useColorModeValue("#00987a", "#57dfc2");
  const hoverBorderColor = useColorModeValue("#00987a", "#57dfc2");
  const activeBg = useColorModeValue("teal.50", "whiteAlpha.100");
  const hoverBg = useColorModeValue("rgba(0,152,122,0.08)", "whiteAlpha.100");
  const navBg = useColorModeValue(
    "rgba(255,255,255,0.78)",
    "rgba(16,18,20,0.72)"
  );
  const navBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Projects", to: "/projects" },
    { label: "About", to: "/about" },
    { label: "Resume", to: "/resume" },
  ];

  return (
    <HStack
      as="nav"
      position="sticky"
      top={0}
      zIndex={20}
      padding={{ base: "10px", md: "12px 18px" }}
      spacing={1.5}
      justifyContent="space-between"
      alignItems="center"
      m={{ base: 2, md: 3 }}
      mb={0}
      w={{ base: "calc(100% - 16px)", md: "calc(100% - 24px)" }}
      border="1px solid"
      borderColor={navBorder}
      borderRadius="xl"
      bg={navBg}
      backdropFilter="blur(16px)"
      boxShadow="0 18px 60px -48px rgba(87, 223, 194, 0.75)"
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
                _hover={{ bg: activeBg }}
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
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            return (
              <Button
                key={item.to}
                as={RouterLink}
                to={item.to}
                className={
                  isActive ? "nav-draw-link nav-draw-link-active" : "nav-draw-link"
                }
                size="sm"
                variant="outline"
                position="relative"
                overflow="hidden"
                sx={{ "--nav-border-color": hoverBorderColor }}
                borderColor="transparent"
                bg={isActive ? activeBg : "transparent"}
                _hover={{
                  bg: hoverBg,
                  borderColor: "transparent",
                }}
                color={textColor}
                display="flex"
                alignItems="center"
                gap={2}
                transition="background 180ms ease, transform 180ms ease"
              >
                <Text color={numberColor} fontWeight="bold">
                  {String(index + 1).padStart(2, "0")}.
                </Text>
                <Text>{item.label}</Text>
              </Button>
            );
          })}
        </HStack>
      )}

      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;

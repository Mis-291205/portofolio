import { HStack, IconButton, Box } from "@chakra-ui/react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa6";

const Footer = () => {
  const iconColor = "#596580";

  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bg="transparent"
      py={{ base: 2, md: 3 }}
      zIndex={10}
    >
      <HStack justify="center" spacing={{ base: 4, md: 8, lg: 12 }}>
        <IconButton
          as="a"
          href="https://www.linkedin.com/in/michael-ivan-santoso-984287368"
          target="_blank"
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
          variant="ghost"
          color={iconColor}
          fontSize={{ base: "26px", md: "32px" }}
          _hover={{ color: "#0077B5" }} // LinkedIn biru
        />
        <IconButton
          as="a"
          href="https://github.com/Mis-291205"
          target="_blank"
          aria-label="GitHub"
          icon={<FaGithub />}
          variant="ghost"
          color={iconColor}
          fontSize={{ base: "26px", md: "32px" }}
          _hover={{ color: "#404650" }} // GitHub hitam
        />
        <IconButton
          as="a"
          href="https://instagram.com/michael.ivan.s"
          target="_blank"
          aria-label="Instagram"
          icon={<FaInstagram />}
          variant="ghost"
          color={iconColor}
          fontSize={{ base: "26px", md: "32px" }}
          _hover={{ color: "#C13584" }} // Instagram ungu/merah muda
        />
        <IconButton
          as="a"
          href="https://wa.me/6285850455727"
          target="_blank"
          aria-label="WhatsApp"
          icon={<FaWhatsapp />}
          variant="ghost"
          color={iconColor}
          fontSize={{ base: "26px", md: "32px" }}
          _hover={{ color: "#25D366" }} // WhatsApp hijau
        />
        <IconButton
          as="a"
          href="mailto:michaelivans29dec@gmail.com"
          aria-label="Email"
          icon={<FaEnvelope />}
          variant="ghost"
          color={iconColor}
          fontSize={{ base: "26px", md: "32px" }}
          _hover={{ color: "#D44638" }} // Email merah
        />
      </HStack>
    </Box>
  );
};

export default Footer;

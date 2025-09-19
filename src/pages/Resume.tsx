import { Box, Heading, Button, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

const Resume = () => {
  return (
    <Box textAlign="center" py={8} px={{ base: 4, md: 12, lg: 28 }}>
      <MotionHeading
        as="h2"
        size="2xl"
        mb={8}
        mt={4}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Resume / CV
      </MotionHeading>

      <MotionBox
        border="1px solid"
        borderColor="gray.300"
        borderRadius="xl"
        overflow="hidden"
        w={{ base: "100%", md: "85%", lg: "75%" }}
        h={{ base: "600px", md: "800px", lg: "900px" }}
        mx="auto"
        mb={8}
        boxShadow="lg"
        bg="white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <iframe
          src="/Michael Ivan - CV - Resume.pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Resume"
        />
      </MotionBox>

      <Link
        href="/Michael Ivan - CV - Resume.pdf"
        download
        _hover={{ textDecoration: "none" }}
      >
        <MotionButton
          colorScheme="teal"
          size="lg"
          mb={7}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Download File
        </MotionButton>
      </Link>
    </Box>
  );
};

export default Resume;

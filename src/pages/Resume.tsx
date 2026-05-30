import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PdfCanvasViewer from "../components/PdfCanvasViewer";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const Resume = () => {
  return (
    <Box
      textAlign="center"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 12, lg: 28 }}
      pb={{ base: 20, md: 24 }}
    >
      <MotionHeading
        as="h2"
        size="2xl"
        mb={{ base: 8, md: 10 }}
        mt={4}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Resume / CV
      </MotionHeading>

      <MotionBox
        w={{ base: "100%", lg: "82%" }}
        mx="auto"
        mb={8}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <PdfCanvasViewer
          src="/Michael-Ivan-CV.pdf"
          title="Michael Ivan Santoso CV"
          height={{ base: "720px", lg: "900px" }}
        />
      </MotionBox>
    </Box>
  );
};

export default Resume;

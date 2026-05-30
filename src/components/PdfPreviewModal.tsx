import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import PdfCanvasViewer from "./PdfCanvasViewer";

type PdfPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
};

const PdfPreviewModal = ({
  isOpen,
  onClose,
  src,
  title,
}: PdfPreviewModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(12px)" />
      <ModalContent bg="transparent" boxShadow="none" maxW="1280px">
        <PdfCanvasViewer
          src={src}
          title={title}
          onClose={onClose}
          height={{ base: "86vh", lg: "88vh" }}
        />
      </ModalContent>
    </Modal>
  );
};

export default PdfPreviewModal;

import { FC, useState } from "react";
import { StyledContainer } from "../components/StyledContainer.tsx";
import { Box, Button, Modal, Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import { DropzoneContainer } from "../components/DropzoneContainer.tsx";
import { MamoothDocViewer } from "../components/MamoothDocViewer.tsx";

export const FileViewer: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Document Viewer
      </Typography>
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant="h6" component="p">
              Drag & drop a document here, or click to select one
            </Typography>
          </DropzoneContainer>
        )}
      </Dropzone>
      {file && (
        <Box mt={4}>
          <Typography variant="h5" component="h2">
            Selected File: {file.name}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            View
          </Button>
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2">
                Document Preview
              </Typography>
              <MamoothDocViewer file={file} />
              <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </StyledContainer>
  );
};

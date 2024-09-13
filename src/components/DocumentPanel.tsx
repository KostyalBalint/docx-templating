import { FC } from "react";
import Dropzone from "react-dropzone";
import { DropzoneContainer } from "./DropzoneContainer.tsx";
import { Typography } from "@mui/material";
import { MamoothDocViewer } from "./MamoothDocViewer.tsx";

type DocumentPanelProps = {
  setFile: (file: File) => void;
  file: File | null;
};
export const DocumentPanel: FC<DocumentPanelProps> = ({ file, setFile }) => {
  const handleDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  if (!file) {
    return (
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
    );
  } else {
    return <MamoothDocViewer file={file} />;
  }
};

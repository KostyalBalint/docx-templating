import { FC } from "react";
import Dropzone from "react-dropzone";
import { DropzoneContainer } from "./DropzoneContainer.tsx";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { MamoothDocViewer } from "./MamoothDocViewer.tsx";
import { useSnackbar } from "notistack";

type DocumentPanelProps = {
  setFile: (file: File) => void;
  file: File | null;
};

const TemplateSelectList: FC<{ setFile: (file: File) => void }> = (props) => {
  //const templates = import.meta.glob("/src/assets/templates/*.docx");
  const templates = import.meta.glob("/src/assets/templates/*.docx", {
    eager: true,
    as: "url",
  });
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Typography variant="h6" component="p">
        Or use an existing template
      </Typography>
      <Autocomplete
        fullWidth
        disablePortal
        options={Object.keys(templates).map((t) => t.split("/").at(-1))}
        onChange={async (_, value) => {
          if (value) {
            const url = templates["/src/assets/templates/" + value];
            fetch(new URL(url, import.meta.url).href)
              .then((res) => {
                res
                  .arrayBuffer()
                  .then((buffer) => {
                    props.setFile(new File([buffer], value));
                  })
                  .catch((e) => {
                    enqueueSnackbar({
                      message: e,
                      variant: "error",
                    });
                  });
              })
              .catch((e) => {
                enqueueSnackbar({
                  message: e,
                  variant: "error",
                });
              });
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Templates" size="small" />
        )}
      />
    </Box>
  );
};

export const DocumentPanel: FC<DocumentPanelProps> = ({ file, setFile }) => {
  const handleDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  if (!file) {
    return (
      <Stack gap={2}>
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
        <TemplateSelectList setFile={setFile} />
      </Stack>
    );
  } else {
    return <MamoothDocViewer file={file} />;
  }
};

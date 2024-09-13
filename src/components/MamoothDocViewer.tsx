import { FC, useEffect, useState } from "react";
import mammoth from "mammoth";
import { Box, Divider, Typography } from "@mui/material";

type DocViewProps = {
  file: File;
};

export const MamoothDocViewer: FC<DocViewProps> = ({ file }) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (
          event.target &&
          event.target.result &&
          typeof event.target.result !== "string"
        ) {
          const { value } = await mammoth.convertToHtml({
            arrayBuffer: event.target.result,
          });
          setHtml(value);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);
  return (
    <Box>
      <Typography variant="body1">{file.name}</Typography>
      <Divider />
      <div
        className="doc-viewer"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          width: "100%",
          overflow: "auto",
        }}
      />
    </Box>
  );
};

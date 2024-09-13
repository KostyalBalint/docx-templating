import { FC, useEffect, useState } from "react";
import mammoth from "mammoth";

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
    <div>
      <h2>{file.name} (DOCX)</h2>
      <div
        className="doc-viewer"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
          padding: "10px",
          overflow: "auto",
        }}
      />
    </div>
  );
};

import DocViewer, { DocViewerRenderers, IDocument } from "react-doc-viewer";
import { FC, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

type DocViewProps = {
  file: File;
};

export const DocumentViewer: FC<DocViewProps> = ({ file }) => {
  const [fileDate, setFileDate] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    file.arrayBuffer().then((buffer) => {
      setFileDate(buffer);
    });
  }, [file]);

  if (!fileDate) {
    return <Skeleton width="100%" height="20px" />;
  }

  const docs: IDocument[] = [
    { uri: file.name, fileData: fileDate, fileType: file.type },
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
};

import { FC, useState } from "react";
import { StyledContainer } from "../components/StyledContainer.tsx";
import { Grid, Paper, Typography } from "@mui/material";
import { DocumentPanel } from "../components/DocumentPanel.tsx";
import { TemplateFillList } from "../components/TemplateFillList.tsx";

export const FilePage: FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <StyledContainer
      sx={{
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Document Template Engine
      </Typography>
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            {!file && <Typography>No Document Selected</Typography>}
            {file && <TemplateFillList templateFile={file} />}
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <DocumentPanel setFile={setFile} file={file} />
          </Paper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

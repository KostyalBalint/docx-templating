import { FC } from "react";
import { StyledContainer } from "../components/StyledContainer.tsx";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { DocumentPanel } from "../components/DocumentPanel.tsx";
import { TemplateFillList } from "../components/TemplateFillList.tsx";
import { IoIosArrowBack } from "react-icons/io";
import { useTemplate } from "../context/TemplateContext.tsx";

export const FilePage: FC = () => {
  const { templateFile, setTemplateFile } = useTemplate();

  return (
    <StyledContainer
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Button
              startIcon={<IoIosArrowBack />}
              variant="contained"
              sx={{ justifySelf: "start", float: "left" }}
              disabled={!templateFile}
              onClick={() => setTemplateFile(null)}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1" textAlign="center">
              Document Template Engine
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <TemplateFillList />
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper sx={{ p: 2 }}>
            <DocumentPanel />
          </Paper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

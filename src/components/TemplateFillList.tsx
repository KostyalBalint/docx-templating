import { FC } from "react";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { CommandField } from "./CommandField.tsx";
import { findDuplicates } from "../helpers/findDuplicates.tsx";
import { useTemplate } from "../context/TemplateContext.tsx";
import { enqueueSnackbar } from "notistack";

export const TemplateFillList: FC = () => {
  const { compiledTemplate, commands, setCommandValues, templateFile } =
    useTemplate();

  const downloadDoc = () => {
    if (compiledTemplate) {
      const url = URL.createObjectURL(compiledTemplate);
      const link = document.createElement("a");
      link.href = url;
      link.download = compiledTemplate.name || "generated.docx";
      link.click();

      URL.revokeObjectURL(url);
    } else {
      enqueueSnackbar({
        message: "Can't generate template",
        variant: "error",
      });
    }
  };

  const duplicates = findDuplicates(commands?.map((c) => c.code) ?? []);
  const uniqueFields = [...new Set(commands?.map((c) => c.code))];

  if (!templateFile) {
    return <Typography>No Document Selected</Typography>;
  }

  return (
    <Stack gap={2}>
      <Typography>All the fields parsed from the template</Typography>

      {duplicates.length !== 0 && (
        <Alert severity="warning">
          Document contains overlapping keys: {duplicates.join(",")}
        </Alert>
      )}

      <Grid container spacing={2}>
        {uniqueFields.map((code, id) => (
          <Grid item key={code + id} xs={12}>
            <CommandField
              code={code}
              id={id}
              onChange={(value) => {
                setCommandValues((allValues) => ({
                  ...allValues,
                  [code]: value,
                }));
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box>
        <Button
          onClick={downloadDoc}
          disabled={!templateFile}
          variant="contained"
          color="success"
        >
          Generate Docx
        </Button>
      </Box>
    </Stack>
  );
};

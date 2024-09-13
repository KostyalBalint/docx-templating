import { FC, useCallback, useState } from "react";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useTemplateListCommands } from "../hooks/UseTemplateListCommands.tsx";
import { CommandField } from "./CommandField.tsx";
import createReport from "docx-templates";
import { useSnackbar } from "notistack";
import { templateFileName } from "../helpers/templateFileName.ts";
import { findDuplicates } from "../helpers/findDuplicates.tsx";
import { CommandSummary } from "docx-templates/lib/types";

type TemplateFillListProps = {
  templateFile: File;
};

const fillEmptyCommands = (commands: CommandSummary[]) => {
  return commands?.reduce((prev, current) => {
    return {
      ...prev,
      [current.code]: "",
    };
  }, {});
};

export const TemplateFillList: FC<TemplateFillListProps> = (props) => {
  const commands = useTemplateListCommands(props.templateFile);
  const { enqueueSnackbar } = useSnackbar();
  const [commandValues, setCommandValues] = useState<Record<string, string>>(
    {},
  );

  const generateDoc = useCallback(async () => {
    try {
      const emptyObj = fillEmptyCommands(commands ?? []);
      console.log({ ...emptyObj, ...commandValues });
      const generated = await createReport({
        template: new Uint8Array(await props.templateFile.arrayBuffer()),
        noSandbox: true,
        data: { ...emptyObj, ...commandValues },
        cmdDelimiter: ["{", "}"],
      });
      const blob = new Blob([generated], { type: props.templateFile.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const newFileName = templateFileName(
        props.templateFile.name,
        commandValues,
      );
      link.download = newFileName || "generated.docx";
      link.click();

      URL.revokeObjectURL(url);
    } catch (e) {
      enqueueSnackbar({
        message: e instanceof Error ? e.message : "Error while generating DocX",
        variant: "error",
      });
    }
  }, [commandValues, commands]);

  const duplicates = findDuplicates(commands?.map((c) => c.code) ?? []);
  const uniqueFields = [...new Set(commands?.map((c) => c.code))];

  return (
    <Stack gap={2}>
      <Typography>All the fields parsed from the template</Typography>

      {duplicates.length !== 0 && (
        <Alert severity="warning">
          Document contains overlapping keys: {duplicates.join(",")}
        </Alert>
      )}

      <Grid container spacing={1}>
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
        <Button onClick={generateDoc} variant="contained" color="success">
          Generate Docx
        </Button>
      </Box>
    </Stack>
  );
};

import { FC, useCallback, useState } from "react";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useTemplateListCommands } from "../hooks/UseTemplateListCommands.tsx";
import { CommandField } from "./CommandField.tsx";
import createReport from "docx-templates";
import { useSnackbar } from "notistack";

type TemplateFillListProps = {
  templateFile: File;
};

const findDuplicates = <T,>(arr: T[]) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);

export const TemplateFillList: FC<TemplateFillListProps> = (props) => {
  const commands = useTemplateListCommands(props.templateFile);
  const insertCommands = commands?.filter((command) => command.type === "INS");

  const [commandValues, setCommandValues] = useState<Record<string, string>>(
    {},
  );

  const { enqueueSnackbar } = useSnackbar();

  const generateDoc = useCallback(async () => {
    try {
      const generated = await createReport({
        template: new Uint8Array(await props.templateFile.arrayBuffer()),
        data: commandValues,
        cmdDelimiter: ["[", "]"],
      });
      const blob = new Blob([generated], { type: props.templateFile.type });
      const url = URL.createObjectURL(blob);
      window.open(url);
    } catch (e) {
      enqueueSnackbar({
        message: e instanceof Error ? e.message : "Error while generating DocX",
        variant: "error",
      });
    }
  }, [commandValues]);

  const duplicates = findDuplicates(insertCommands?.map((c) => c.code) ?? []);

  return (
    <Stack gap={2}>
      <Typography>All the fields parsed from the template</Typography>

      {duplicates.length !== 0 && (
        <Alert severity="warning">
          Document contains overlapping keys: {duplicates.join(",")}
        </Alert>
      )}

      <Grid container spacing={1}>
        {insertCommands?.map((command, id) => (
          <Grid item key={command.code + id} xs={12}>
            <CommandField
              code={command.code}
              id={id}
              onChange={(value) => {
                setCommandValues((allValues) => ({
                  ...allValues,
                  [command.code]: value,
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

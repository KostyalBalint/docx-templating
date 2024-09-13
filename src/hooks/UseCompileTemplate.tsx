import { useCallback, useEffect, useState } from "react";
import createReport from "docx-templates";
import { CommandSummary } from "docx-templates/lib/types";
import { useSnackbar } from "notistack";

const fillEmptyCommands = (commands: CommandSummary[]) => {
  return commands?.reduce((prev, current) => {
    return {
      ...prev,
      [current.code]: `{${current.code}}`,
    };
  }, {});
};

type useCompileTemplateProps = {
  templateFile: File | null;
  commandValues: Record<string, string>;
  commands: CommandSummary[] | null;
  compiledFileName: string;
};

export const useCompileTemplate = (
  props: useCompileTemplateProps,
): File | null => {
  const [renderedFile, setRenderedFile] = useState<File | null>(null);

  useEffect(() => {
    if (Object.keys(props.commandValues).length > 0) {
      generateDoc().then(setRenderedFile);
    }
  }, [props.templateFile, props.commandValues, props.commands]);

  const { enqueueSnackbar } = useSnackbar();
  const generateDoc = useCallback(async () => {
    if (!props.templateFile) return null;
    try {
      const emptyObj = fillEmptyCommands(props.commands ?? []);
      const generated = await createReport({
        template: new Uint8Array(await props.templateFile.arrayBuffer()),
        noSandbox: true,
        data: { ...emptyObj, ...props.commandValues },
        cmdDelimiter: ["{", "}"],
      });
      const blob = new Blob([generated], { type: props.templateFile.type });

      return new File([blob], props.compiledFileName);
    } catch (e) {
      enqueueSnackbar({
        message: e instanceof Error ? e.message : "Error while generating DocX",
        variant: "error",
      });
    }
    return null;
  }, [props.templateFile, props.commandValues, props.commands]);

  return renderedFile;
};

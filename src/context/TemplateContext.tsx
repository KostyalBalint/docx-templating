import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCompileTemplate } from "../hooks/UseCompileTemplate.tsx";
import { useTemplateListCommands } from "../hooks/UseTemplateListCommands.tsx";
import { CommandSummary } from "docx-templates/lib/types";
import { createCompiledFileName } from "../helpers/createCompiledFileName.ts";

type TemplateContext = {
  templateFile: File | null;
  commandValues: Record<string, string>;

  setTemplateFile: Dispatch<SetStateAction<File | null>>;
  setCommandValues: Dispatch<SetStateAction<Record<string, string>>>;

  compiledTemplate: File | null;
  compiledFileName: string | null;
  commands: CommandSummary[] | null;
};

const Context = createContext<TemplateContext | null>(null);

export const TemplateProvider: FC<PropsWithChildren> = (props) => {
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [commandValues, setCommandValues] = useState<Record<string, string>>(
    {},
  );
  const [compiledFileName, setCompiledFileName] = useState<string | null>(null);

  const commands = useTemplateListCommands(templateFile);

  useEffect(() => {
    if (templateFile) {
      setCompiledFileName(
        createCompiledFileName(templateFile.name, commandValues),
      );
    }
  }, [templateFile, commandValues]);

  const compiledTemplate = useCompileTemplate({
    templateFile,
    commandValues,
    commands,
    compiledFileName: compiledFileName ?? "generated.docx",
  });

  return (
    <Context.Provider
      value={{
        templateFile,
        setTemplateFile,
        commandValues,
        setCommandValues,
        compiledTemplate,
        compiledFileName,
        commands,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useTemplate() must be called form <TemplateContextProvider />",
    );
  }
  return context;
};

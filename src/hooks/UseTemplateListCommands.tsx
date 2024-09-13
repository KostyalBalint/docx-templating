import { CommandSummary } from "docx-templates/lib/types";
import { useEffect, useState } from "react";
import { listCommands } from "docx-templates/lib/main";

export const useTemplateListCommands = (
  templateFile: File,
): CommandSummary[] | null => {
  const [commands, setCommands] = useState<CommandSummary[] | null>(null);

  useEffect(() => {
    templateFile.arrayBuffer().then((buffer) => {
      listCommands(buffer, ["[", "]"]).then((cmds) => {
        setCommands(cmds);
      });
    });
  }, [templateFile]);

  return commands;
};

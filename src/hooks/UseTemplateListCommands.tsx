import { CommandSummary } from "docx-templates/lib/types";
import { useEffect, useState } from "react";
import { listCommands } from "docx-templates/lib/main";

export const useTemplateListCommands = (
  templateFile: File | null,
): CommandSummary[] | null => {
  const [commands, setCommands] = useState<CommandSummary[] | null>(null);

  useEffect(() => {
    if (templateFile) {
      templateFile.arrayBuffer().then((buffer) => {
        listCommands(buffer, ["{", "}"]).then((cmds) => {
          const insertCommands = cmds?.filter((cmd) => cmd.type === "INS");
          setCommands(insertCommands ?? null);
        });
      });
    } else {
      setCommands(null);
    }
  }, [templateFile]);

  return commands;
};

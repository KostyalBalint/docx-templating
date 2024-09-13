export const templateFileName = (
  name: string,
  commandValues: Record<string, string> | null,
) => {
  let newName = name;
  if (commandValues) {
    Object.entries(commandValues).forEach(([key, value]) => {
      newName = newName.replace(`{${key}}`, value);
    });
  }
  return newName;
};

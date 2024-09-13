import { TextField } from "@mui/material";

type CommandFieldProps = {
  id: number;
  code: string;
  onChange: (value: string) => void;
};
export const CommandField = (props: CommandFieldProps) => {
  return (
    <TextField
      multiline
      size="small"
      label={props.code}
      variant="outlined"
      fullWidth
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
};

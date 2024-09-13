import { styled } from "@mui/system";
import { Container } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

import { styled } from "@mui/system";
import { Container } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

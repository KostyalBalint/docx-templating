import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Public Sans, sans-serif",
    fontSize: 12,
    fontWeightRegular: 200,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: "#FFFFFF",
      default: grey[100],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

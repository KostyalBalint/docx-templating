import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { FilePage } from "./pages/FilePage.tsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <FilePage />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

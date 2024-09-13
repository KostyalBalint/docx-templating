import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { FilePage } from "./pages/FilePage.tsx";
import { SnackbarProvider } from "notistack";
import { grey } from "@mui/material/colors";
import { TemplateProvider } from "./context/TemplateContext.tsx";
import { Footer } from "./components/Footer.tsx";

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
        <TemplateProvider>
          <Box
            sx={{
              backgroundColor: grey[200],
            }}
          >
            <FilePage />
          </Box>
          <Footer />
        </TemplateProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

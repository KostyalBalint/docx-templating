import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { FileViewer } from "./pages/FileViewer.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FileViewer />
    </ThemeProvider>
  );
}

export default App;

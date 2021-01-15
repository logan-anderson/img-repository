import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Layout } from "./Layout";
import { HomePage } from "./pages";
import { UploadPage } from "./pages/upload";

function App() {
  const [prefersDarkMode, setDark] = useState(true);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout setDark={setDark} dark={prefersDarkMode}>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

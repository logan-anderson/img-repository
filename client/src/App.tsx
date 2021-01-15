import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages";
import { UploadPage } from "./pages/upload";

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/upload">
          <UploadPage />
        </Route>
      </Layout>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages";

function App() {
  return (
    <Router>
      <Layout>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/upload">
          <div>upload page</div>
        </Route>
      </Layout>
    </Router>
  );
}

export default App;

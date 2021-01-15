import { AppBar, Container, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
export const Layout: React.FC = ({ children }) => {
  const hist = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Typography variant="h6">Image Repository</Typography>
          </Link>
          <Button
            color="inherit"
            variant="outlined"
            style={{
              marginLeft: "1.5rem",
            }}
            onClick={() => {
              hist.push("/upload");
            }}
          >
            Add a new image
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div>{children}</div>
      </Container>
    </>
  );
};

import {
  AppBar,
  CircularProgress,
  Container,
  Toolbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Image Repository</Typography>
          <Button
            color="inherit"
            variant="outlined"
            style={{
              marginLeft: "1.5rem",
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

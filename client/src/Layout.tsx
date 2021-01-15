import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import { Brightness3, Brightness7 } from "@material-ui/icons";
export const Layout: React.FC<{
  setDark: (mode: boolean) => void;
  dark: boolean;
}> = ({ children, dark, setDark }) => {
  const hist = useHistory();
  const icon = !dark ? <Brightness7 /> : <Brightness3 />;
  const toggeDark = () => setDark(!dark);

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
          <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            style={{
              marginLeft: "auto",
            }}
            onClick={toggeDark}
          >
            {icon}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div>{children}</div>
      </Container>
    </>
  );
};

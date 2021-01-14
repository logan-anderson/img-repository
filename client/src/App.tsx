import {
  AppBar,
  CircularProgress,
  Container,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ENDPOINT } from "./constants";

import { Image, Tag } from "./interfaces";
import { ChooseTagOptions } from "./Tags";
const Images: React.FC<{ images: Image[] | undefined }> = ({ images }) => {
  if (!images) {
    return <CircularProgress />;
  }
  return (
    <div>
      {images.map((img) => (
        <div key={img.id}>{img.name}</div>
      ))}
    </div>
  );
};

function App() {
  const [images, setImages] = useState<Image[] | undefined>();
  const [tags, setTags] = useState<Tag[]>([]);
  console.log(tags);
  useEffect(() => {
    const fetchImages = async () => {
      setImages(undefined);
      if (!ENDPOINT) {
        throw new Error("REACT_APP_API_URL is not defined");
      }
      const res = await fetch(`${ENDPOINT}/img?tags=${JSON.stringify(tags)}`);
      if (res.ok) {
        const { imgs } = await res.json();
        setImages(imgs);
      }
    };
    fetchImages().catch((e) => {
      console.error(e);
      throw e;
    });
  }, [setImages, tags]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Image Repository</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <ChooseTagOptions setTags={setTags} freeSolo={false} />
        <Images images={images} />
      </Container>
    </>
  );
}

export default App;

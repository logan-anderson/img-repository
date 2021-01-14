import {
  AppBar,
  CircularProgress,
  Container,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// no types =(
// @ts-ignore
import { PickerOverlay } from "filestack-react";

import { API_KEY, ENDPOINT } from "./constants";
import { Image, Tag, RootFileObj } from "./interfaces";
import { ChooseTagOptions } from "./Tags";
import { postData } from "./util/post";
const Images: React.FC<{ images: Image[] | undefined }> = ({ images }) => {
  if (!images) {
    return <CircularProgress />;
  }
  return (
    <div>
      {images.map((img) => (
        <div>
          <div key={img.id}>{img.name}</div>
          <img
            src={img.url}
            alt="img"
            style={{
              height: "30vh",
            }}
          />
        </div>
      ))}
    </div>
  );
};

function App() {
  const [images, setImages] = useState<Image[] | undefined>();
  const [tags, setTags] = useState<Tag[]>([]);
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
      <PickerOverlay
        apikey={API_KEY}
        onSuccess={(res: RootFileObj) => {
          const { filesUploaded } = res;
          filesUploaded.forEach((file) => {
            const img: Image = {
              name: "test",
              tags: [],
              url: file.url,
            };
            postData(`${ENDPOINT}/img`, img).then((data) => {
              console.log(data);
            });
          });

          return console.log(res);
        }}
      />
      <Container maxWidth="md">
        <ChooseTagOptions setTags={setTags} freeSolo={false} />
        <Images images={images} />
      </Container>
    </>
  );
}

export default App;

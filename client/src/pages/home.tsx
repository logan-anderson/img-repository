import { CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { ENDPOINT } from "../constants";
import { ImageDisplay } from "../ImageDisplay";
import { Image, Tag } from "../interfaces";
import { ChooseTagOptions } from "../Tags";

const Images: React.FC<{ images: Image[] | undefined }> = ({ images }) => {
  if (!images) {
    return <CircularProgress />;
  }
  return (
    <Grid container xs={12} spacing={5}>
      {images.map((img) => (
        <ImageDisplay image={img} />
      ))}
    </Grid>
  );
};

export const HomePage: React.FC = () => {
  const [images, setImages] = useState<Image[] | undefined>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      setImages(undefined);
      if (!ENDPOINT) {
        throw new Error("REACT_APP_API_URL is not defined");
      }
      const res = await fetch(
        `${ENDPOINT}/img?tags=${JSON.stringify(tags)}&name=${name}`
      );
      if (res.ok) {
        const { imgs } = await res.json();
        console.log({ imgs });
        setImages(imgs);
      }
    };
    fetchImages().catch((e) => {
      console.error(e);
      throw e;
    });
  }, [setImages, tags, name]);

  return (
    <>
      <TextField
        variant="filled"
        fullWidth
        label="Search by name"
        onChange={(e) => {
          console.log(e.target.value);
          setName(e.target.value);
        }}
        style={{
          marginTop: "1rem",
        }}
      />
      <ChooseTagOptions setTags={setTags} freeSolo={false} />
      <Images images={images} />
    </>
  );
};

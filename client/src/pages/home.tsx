import { CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { API_KEY, ENDPOINT } from "../constants";
import { Image, Tag, RootFileObj } from "../interfaces";
import { ChooseTagOptions } from "../Tags";
import { postData } from "../util/post";

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

export const HomePage: React.FC = () => {
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
        console.log({ imgs });
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
      <ChooseTagOptions setTags={setTags} freeSolo={false} />
      <Images images={images} />
    </>
  );
};

import { CircularProgress } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
// no types =(
// @ts-ignore
import { PickerOverlay } from "filestack-react";
import { API_KEY, ENDPOINT } from "../constants";
import { Image, Tag, RootFileObj } from "../interfaces";
import { ChooseTagOptions } from "../Tags";
import { postData } from "../util/post";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "../Layout";

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
  // const ref = useRef<HTMLDivElement>(null);

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
      <ChooseTagOptions setTags={setTags} freeSolo={false} />
      <Images images={images} />
      {/* <div id="test" className="test"></div> */}
    </>
  );
};

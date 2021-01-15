import { useState } from "react";
// no types =(
// @ts-ignore
import { PickerOverlay } from "filestack-react";
import { Button, Input, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Image, RootFileObj, Tag } from "../interfaces";
import { API_KEY, ENDPOINT } from "../constants";
import { postData } from "../util/post";
import { ChooseTagOptions } from "../Tags";
export const UploadPage: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const hist = useHistory();

  return (
    <>
      <Typography is="h2">Step 1: Give your image a name</Typography>
      <Input
        onChange={(e) => {
          console.log(e.target.value);
          setName(e.target.value);
        }}
      />

      <Typography is="h2">Step 2: Choose the Tags for your image</Typography>

      <ChooseTagOptions setTags={setTags} freeSolo={true} />
      {showWidget && (
        <PickerOverlay
          apikey={API_KEY}
          onSuccess={(res: RootFileObj) => {
            const { filesUploaded } = res;
            filesUploaded.forEach(async (file) => {
              const img: Image = {
                name,
                tags,
                url: file.url,
              };
              const data = await postData(`${ENDPOINT}/img`, img);
              console.log({ data });
              hist.push("/");
            });

            return console.log(res);
          }}
        />
      )}
      <Typography is="h2">
        Step 3: Click the button below to upload your image
      </Typography>

      <Button
        onClick={() => {
          setShowWidget(true);
        }}
      >
        Done and upload
      </Button>
    </>
  );
};

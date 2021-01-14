/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Tag } from "./interfaces";
import { ENDPOINT } from "./constants";

const normalizeTag = (value: string | Tag): Tag => {
  let tag: Tag | undefined;
  if (typeof value == "string") {
    tag = { name: value };
  } else {
    tag = value;
  }
  return tag;
};

export const ChooseTagOptions: React.FC<{
  setTags: (tags: Tag[]) => void;
  freeSolo: boolean;
}> = ({ setTags, freeSolo }) => {
  const [options, setOptions] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      const res = await fetch(`${ENDPOINT}/tags`);
      const { tags } = await res.json();
      setOptions(tags);
      setLoading(false);
    };
    fetchTags();
  }, []);

  return (
    <div>
      <Autocomplete
        onChange={(e, value) => {
          const tags = value.map(normalizeTag);
          setTags(tags);
        }}
        getOptionLabel={(option) => normalizeTag(option).name}
        options={options}
        loading={loading}
        multiple
        id="tags-filled"
        freeSolo={freeSolo}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={normalizeTag(option).name}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Filter Images by tags"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
};

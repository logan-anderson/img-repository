import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import { Image } from "./interfaces";

export const ImageDisplay: React.FC<{ image: Image }> = ({ image }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={3}
        style={{
          padding: ".5rem",
        }}
      >
        <Typography align="center" variant="h1" is="h1">
          {image.name}
        </Typography>
        <Grid container alignContent="space-between">
          {image.tags.map((tag) => (
            <Grid key={tag.id} xs={2}>
              <Chip label={tag.name} color="default" />
            </Grid>
          ))}
        </Grid>
        <div>
          <img
            src={image.url}
            alt="img"
            style={{
              width: "100%",
            }}
          />
        </div>
      </Paper>
    </Grid>
  );
};

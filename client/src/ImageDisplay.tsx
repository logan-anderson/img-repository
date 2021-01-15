import { Chip, Grid, Paper, Typography } from "@material-ui/core";
import { Image } from "./interfaces";

export const ImageDisplay: React.FC<{ image: Image }> = ({ image }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3}>
        <Typography align="center" variant="h2" is="h2">
          {image.name}
        </Typography>
        <div>
          {image.tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} color="secondary" />
          ))}
        </div>
        <div>
          <img
            src={image.url}
            alt="img"
            style={{
              height: "30vh",
            }}
          />
        </div>
      </Paper>
    </Grid>
  );
};

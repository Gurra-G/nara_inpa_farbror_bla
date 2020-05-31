import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";

// In a perfect world, this is used for setting components styles. That is however not the case.
const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
  },
}));

const Banner = () => {
  // used in the same way as in AppBar, here however, it does nothing.
  const classes = useStyles();

  return (
    /**
     * Todo:
     * - find a way to hinder the user from being able to pause and unpause the video.
     * - change to a clip without credits at the bottom.
     *
     */

    <ReactPlayer
      url="https://youtu.be/PqLNr7GMWB0"
      playing
      className={classes.video}
      loop
      muted
      width="100%"
    />
  );
};

export default Banner;

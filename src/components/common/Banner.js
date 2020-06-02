import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import VideoContent from "../../MediaContent/bannerVideo.mp4";

// In a perfect world, this is used for setting components styles. That is however not the case.
const useStyles = makeStyles(() => ({
  video: {
    width: "100%",
  },
  bannerText: {
    zIndex: 1,
    position: "absolute",
    color: "white",
    margin: "10% 24% 10% 25%",
    fontSize: "3.8vw",
    fontFamily: "'Black Ops One', cursive",
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
    <Fragment>
      <Typography variant="h1" className={classes.bannerText}>
        NÄRA INPÅ FARBROR BLÅ
      </Typography>
      <video
        className={classes.video}
        playsinline="playsinline"
        autoplay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src={VideoContent} type="video/mp4" />
      </video>
    </Fragment>
  );
};

export default Banner;

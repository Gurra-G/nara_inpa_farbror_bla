import React, { Fragment } from "react";
import EventCard from "../common/EventCard";
import { Grid } from "@material-ui/core";

const List = (props) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-start"
    >
      {props.events.map((event) => (
        <EventCard event={event} />
      ))}
    </Grid>
  );
};

export default List;

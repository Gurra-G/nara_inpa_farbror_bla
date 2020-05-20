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
        <EventCard
          changeView={props.changeView}
          event={event}
          key={event.id}
          myPosition={props.myPosition}
        />
      ))}
    </Grid>
  );
};

export default List;

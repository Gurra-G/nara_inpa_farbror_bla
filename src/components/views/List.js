import React from "react";
import EventCard from "../common/EventCard";
import { Grid } from "@material-ui/core";

const List = props => {
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-start"
      style={{ paddingTop: 100 }}
    >
      {props.events.map(event => (
        <EventCard
          key={event.id}
          changeView={props.changeView}
          event={event}
          myPosition={props.myPosition}
        />
      ))}
    </Grid>
  );
};

export default List;

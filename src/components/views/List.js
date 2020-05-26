import React, { useState, useEffect } from "react";
import EventCard from "../common/EventCard";
import { Grid } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const List = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const filter = useSelector((state) => state.filterState.filter);

  useFirestoreConnect([
    auth.uid
      ? {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "events" }],
          storeAs: "myEvents",
        }
      : { collection: "users" }, // Ugly crash fix when signed out and unable to fetch subcollections
  ]);

  const savedEvents = useSelector((state) => state.firestore.data.myEvents);

  const filterEvents = () => {
    return savedEvents !== undefined
      ? Object.keys(savedEvents).map((key) => {
          return savedEvents[key];
        })
      : [];
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-start"
      style={{ paddingTop: 100 }}
    >
      {!filter
        ? props.events.map((event) => (
            <EventCard
              key={event.id}
              changeView={props.changeView}
              event={event}
              myPosition={props.myPosition}
            />
          ))
        : filterEvents().map((event) =>
            event != null ? (
              <EventCard
                key={event.id}
                changeView={props.changeView}
                event={event}
                myPosition={props.myPosition}
              />
            ) : (
              ""
            )
          )}
    </Grid>
  );
};

export default List;

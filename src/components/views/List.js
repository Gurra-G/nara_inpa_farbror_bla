import React, { Fragment } from "react";
import EventCard from "../common/EventCard";
import { Grid, Fab, makeStyles, Typography } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { fetchEvents } from "../../store/actions/EventActions";

import Banner from "../common/Banner";

const useStyles = makeStyles((theme) => ({
  moreEventsButton: {
    background: "transparent",
    boxShadow: "none",
    display: "block",
    margin: "0 auto",
    "&:hover": {
      background: "transparent",
    },
  },
  gridHeader: {
    marginTop: "10px",
    textAlign: "center",
  },
}));

/**
 *
 * @param {Object} props - contains current events based on filter, the users position, fetchCounter value and increseCounter function
 */
const List = (props) => {
  //holds the firebase auth object
  const auth = useSelector((state) => state.firebase.auth);

  //used for checking the redux filter state
  const filter = useSelector((state) => state.filterState.filter);

  // used for setting the component styles
  const classes = useStyles();

  //used for dispatching actions in the component
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchEvents(props.increaseCounter()));
  };

  //connects to the firestore user collection and subsequent collections
  useFirestoreConnect([
    auth.uid
      ? {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "events" }],
          storeAs: "myEvents",
          orderBy: ["date_human", "desc"],
        }
      : { collection: "users" }, // Ugly crash fix when signed out and unable to fetch subcollections
  ]);

  //fetches the users saved events from firestore
  const savedEvents = useSelector((state) => state.firestore.data.myEvents);

  //used for creating a array based on the users saved events object keys
  const filterEvents = () => {
    return savedEvents !== undefined && savedEvents !== null
      ? Object.keys(savedEvents).map((key) => {
          return savedEvents[key];
        })
      : [];
  };

  return (
    <Fragment>
      <Banner />
      <Typography variant="h5" className={classes.gridHeader}>
        {!filter ? "Senaste nytt" : "Dina sparade händelser"}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        style={{ paddingTop: 10 }}
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
      {filter ? (
        ""
      ) : (
        <Fab
          className={classes.moreEventsButton}
          color="defualt"
          onClick={handleClick}
        >
          <ExpandMoreIcon fontSize="large" />
        </Fab>
      )}
    </Fragment>
  );
};

export default List;

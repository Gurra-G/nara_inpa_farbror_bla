import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../views/List";

import { fetchEvents } from "../../store/actions/EventActions";
import { CircularProgress } from "@material-ui/core";
import { useFirestoreConnect } from "react-redux-firebase";

function Dashboard() {
  const [filter, setFilter] = useState("Brottsplatsevent");
  const [myPosition, setPosition] = useState(null);

  const dispatch = useDispatch();

  useFirestoreConnect([{ collection: "events" }]);

  const events = useSelector((state) => state.eventState.data);
  const myEvents = useSelector((state) => state.firestore.ordered.events);
  console.log(myEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (position) => {
      console.log("This is our position: ", position.coords);
      setPosition(position.coords);
    };

    const error = (error) => {
      console.warn("Something went wrong: ", error.message);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  return (
    <Fragment>
      {myPosition != null ? (
        <List events={events != null ? events : []} myPosition={myPosition} />
      ) : (
        <CircularProgress variant={"secondary"} />
      )}
      )}
    </Fragment>
  );
}

export default Dashboard;

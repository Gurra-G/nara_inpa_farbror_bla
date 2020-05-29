import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../views/List";

import { fetchEvents } from "../../store/actions/EventActions";
import { CircularProgress } from "@material-ui/core";

/**
 * A component used for rendering the Dashboard
 */
function Dashboard() {
  //Local state used for storing the users position through geolocation
  const [myPosition, setPosition] = useState(null);

  //stores a int used when fetching events
  const [fetchCounter, setCounter] = useState(1);

  //used for dispatching actions in the component
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filterState.filter);

  //used for fetching the events in the event reducer state
  const events = useSelector((state) => state.eventState.data);

  const increaseCounter = () => {
    setCounter(fetchCounter + 1);
    return fetchCounter + 1;
  };

  //Dispatches an action which fires a api call for fetcing events
  useEffect(() => {
    dispatch(fetchEvents(fetchCounter));
  }, [dispatch]);

  //Gets the users position through geolocation
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (position) => {
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
        <List
          events={!filter ? events : []}
          myPosition={myPosition}
          fetchCounter={fetchCounter}
          increaseCounter={increaseCounter}
        />
      ) : (
        <CircularProgress variant={"secondary"} />
      )}
    </Fragment>
  );
}

export default Dashboard;

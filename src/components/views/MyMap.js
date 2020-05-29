import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Fab, CircularProgress } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import { fetchEvents } from "../../store/actions/EventActions";
import { GOOGLE_MAPS_API_KEY } from "../../config/googleConfig";

//used for displaying the current event (card) the user clicked on from all events
const filterCurrentCard = (currentCardId, events) => {
  const event = events.filter((event) => event.id == currentCardId);
  return (
    <Marker
      position={{
        lat: event[0].lat,
        lng: event[0].lng,
      }}
    />
  );
};

/**
 *
 * @param {object} props - contains the google object
 */
const MyMap = (props) => {
  //used for getting the current event id from the url
  const { id } = useParams();

  //used for keeping track of the users position
  const [myPosition, setPosition] = useState(null);

  //used for getting the events from redux state
  const events = useSelector((state) => state.eventState.data);

  //used for dispatching actions in the component
  const dispatch = useDispatch();

  //Dispatches an action which fires a api call for fetcing events
  useEffect(() => {
    dispatch(fetchEvents());
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
      <Link to={"/"}>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", left: 20, bottom: 20, zIndex: 10 }}
        >
          <ArrowBack />
        </Fab>
      </Link>
      {myPosition != null ? (
        <Map
          google={props.google}
          zoom={9}
          initialCenter={{
            lat: myPosition.latitude,
            lng: myPosition.longitude,
          }}
        >
          <Marker
            position={{
              lat: myPosition.latitude,
              lng: myPosition.longitude,
            }}
          />
          {events != null ? filterCurrentCard(id, events) : ""}
        </Map>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MyMap);

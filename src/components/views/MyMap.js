import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Fab, CircularProgress } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import { fetchEvents } from "../../store/actions/EventActions";

const GOOGLE_MAPS_API_KEY = "AIzaSyD1UR-a8k9Un26A7HKAKbIlVAbKfU6-hfo";

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

function MyMap(props) {
  const { id } = useParams();
  const [myPosition, setPosition] = useState(null);
  const events = useSelector((state) => state.eventState.data);
  const dispatch = useDispatch();

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
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MyMap);

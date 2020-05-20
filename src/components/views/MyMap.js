import React from "react";
import { Fab } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const API_KEY = "AIzaSyD1UR-a8k9Un26A7HKAKbIlVAbKfU6-hfo";

const selectCurrentCard = (currentCardId, events) => {
  const event = events.filter((event) => event.id === currentCardId);
  return (
    <Marker
      position={{
        lat: event[0].lat,
        lng: event[0].lng,
      }}
    />
  );
};

const MyMap = (props) => {
  return (
    <React.Fragment>
      <Fab
        onClick={() => props.changeView("list")}
        color="primary"
        aria-label="add"
        style={{ position: "absolute", left: 20, bottom: 20, zIndex: 10 }}
      >
        <ArrowBack />
      </Fab>
      <Map
        google={props.google}
        zoom={14}
        initialCenter={{
          lat: props.myPosition.latitude,
          lng: props.myPosition.longitude,
        }}
      >
        <Marker
          position={{
            lat: props.myPosition.latitude,
            lng: props.myPosition.longitude,
          }}
        />
        {selectCurrentCard(props.currentView.currentCard, props.events)}
      </Map>
    </React.Fragment>
  );
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MyMap);

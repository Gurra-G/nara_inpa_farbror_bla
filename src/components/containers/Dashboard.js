import React, { useState, useEffect } from "react";
import AppBar from "../common/AppBar";
import List from "../views/List";
import MyMap from "../views/MyMap";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [myPosition, setPosition] = useState(null);
  const [currentView, setCurrentView] = useState({
    currentView: "list",
    currentCard: null,
  });

  useEffect(() => {
    fetch("https://brottsplatskartan.se/api/events?area=skåne län")
      .then((response) => {
        return response.json();
      })
      .then((data) => setEvents(data.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <React.Fragment>
      <AppBar />
      {currentView.currentView === "map" ? (
        <MyMap
          changeView={setCurrentView}
          currentView={currentView}
          myPosition={myPosition}
          events={events}
        />
      ) : (
        <List
          events={events}
          changeView={setCurrentView}
          myPosition={myPosition}
        />
      )}
    </React.Fragment>
  );
}

export default Dashboard;

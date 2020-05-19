import React, { useState, useEffect } from "react";
import AppBar from "../common/AppBar";
import List from "../views/List";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://brottsplatskartan.se/api/events?area=skåne län")
      .then((response) => {
        return response.json();
      })
      .then((data) => setEvents(data.data))
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <React.Fragment>
      <AppBar />
      <List events={events}/>
    </React.Fragment>
  );
}

export default Dashboard;

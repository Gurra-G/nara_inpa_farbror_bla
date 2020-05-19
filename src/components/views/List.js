import React, { Fragment } from "react";
import EventCard from "../common/EventCard";

const test = [{ title: "Mord" }, { title: "Cykelstöld" }, { title: "Haram" }];

const List = () => {
  return (
    <Fragment>
      {test.map((t) => (
        <EventCard eventCardTitle={t.title} />
      ))}
    </Fragment>
  );
};

export default List;

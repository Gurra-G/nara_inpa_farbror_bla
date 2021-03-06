import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../containers/Dashboard";
import MyMap from "../views/MyMap";

//used for redirecting the user to different comopents
const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Dashboard} />
      <Route exact path={"/events/:id"} component={MyMap} />
    </Switch>
  );
};

export default Router;

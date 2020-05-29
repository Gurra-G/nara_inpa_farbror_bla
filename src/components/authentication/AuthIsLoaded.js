import React from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { CircularProgress } from "@material-ui/core";

// When the application loads, it checks if the instance of firebase auth is loaded
const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return <CircularProgress style={{ alignSelf: "center" }} />;
  return children;
};

export default AuthIsLoaded;

import React from "react";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { CircularProgress } from "@material-ui/core";

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return <CircularProgress style={{ alignSelf: "center" }} />;
  return children;
};

export default AuthIsLoaded;

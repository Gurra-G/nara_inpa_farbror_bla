import React, { useState, useEffect, useRef } from "react";
import AuthIsLoaded from "./components/authentication/AuthIsLoaded";
import Router from "./components/router";
import AppBar from "./components/common/AppBar";
import { BrowserRouter } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import CustomSnackbar from "./components/common/CustomSnackbar";

/**
 * Main component to hold our
 * BrowserRouter
 * AuthIsloaded
 * AppBar
 * SignIn
 * CustomSnackbar
 */
function App() {
  const [open, setOpen] = useState(false);

  //Used to open & close our SignIn-Register form
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <div className="App">
          <AppBar handleOpen={handleOpen} />
          <SignIn open={open} handleClose={handleClose} />
          <CustomSnackbar />
          <Router />
        </div>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

export default App;

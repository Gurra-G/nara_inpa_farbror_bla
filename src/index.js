import React from "react";
import { render } from "react-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import storeConfig from "./config/storeConfig";
import fbConfig from "./config/fbConfig";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

const store = storeConfig(); //Creates a store from redux from our config file

//A property object containg our firebase configurations
const reactReduxFirebaseProps = {
  firebase: fbConfig,
  config: { userProfile: "users", useFirestoreForProfile: true },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

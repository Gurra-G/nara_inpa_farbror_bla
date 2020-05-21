import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import EventReducer from "./EventReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  eventState: EventReducer
});

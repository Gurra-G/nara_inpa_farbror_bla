import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import EventReducer from "./EventReducer";
import SnackbarReducer from "./SnackbarReducer";
import FilterReducer from "./FilterReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  eventState: EventReducer,
  snackbarState: SnackbarReducer,
  filterState: FilterReducer,
  authState: AuthReducer,
});

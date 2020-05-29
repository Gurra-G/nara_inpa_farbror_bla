import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import EventReducer from "./EventReducer";
import SnackbarReducer from "./SnackbarReducer";
import FilterReducer from "./FilterReducer";
import AuthReducer from "./AuthReducer";

//this is a root reducers which stores all our reducers in one place, used to be able to create our store (the firestore can only handle one reducer/state, which is why we need to store it in one place)
export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  eventState: EventReducer,
  snackbarState: SnackbarReducer,
  filterState: FilterReducer,
  authState: AuthReducer,
});

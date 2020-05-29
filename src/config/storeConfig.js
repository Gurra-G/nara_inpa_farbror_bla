import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import rootReducer from "../store/reducers/rootReducer";

//Creates a store using redux
export default function storeConfig(preloadedState) {
  //Creates a middleware using thunk which allows us to modify firestore and firebase
  const middlewares = [
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, preloadedState, middlewareEnhancer);
  return store;
}

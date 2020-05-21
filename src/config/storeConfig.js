import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import rootReducer from "../store/reducers/rootReducer";

export default function storeConfig(preloadedState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, preloadedState, middlewareEnhancer);
  return store;
}

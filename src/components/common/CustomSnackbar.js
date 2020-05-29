import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

import { CLOSE_CUSTOMSNACKBAR } from "../../store/actions/Types";

//used for displaying the text inside the snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//used for rendering a alertbox a the bottom of the page
const CustomSnackbar = () => {
  //used for dispatching actions in the component
  const dispatch = useDispatch();

  // sets up a variable that allows access to firebase
  const open = useSelector((state) => state.snackbarState.open);

  // used for setting text inside the snackbar
  const text = useSelector((state) => state.snackbarState.text);

  // used for setting the snackbar color
  const color = useSelector((state) => state.snackbarState.color);

  //used for handling the closing of the snackbar by dispatching a action
  const handleClose = () => {
    dispatch({ type: CLOSE_CUSTOMSNACKBAR });
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={color}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

import { CLOSE_CUSTOMSNACKBAR } from "../../store/actions/Types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snackbarState.open);
  const text = useSelector((state) => state.snackbarState.text);
  const color = useSelector((state) => state.snackbarState.color);

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

import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import {
  Button,
  Slide,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../../store/actions/AuthActions";

function HideOnScroll(props) {
  const { children, window } = props; //Property destructering
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  Btn: {
    color: "#ffffff",
    textDecoration: "none"
  }
}));

const Appbar = props => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const boundSignOut = () => dispatch(signOut(firebase));
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Nära inpå farbror blå
            </Typography>
            {!auth.uid ? (
              <Button
                onClick={() => props.handleOpen()}
                className={classes.Btn}
                color="inherit"
              >
                SIGN IN
              </Button>
            ) : (
              <Button
                onClick={() => boundSignOut()}
                className={classes.Btn}
                color="inherit"
              >
                SIGN OUT
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};

export default Appbar;

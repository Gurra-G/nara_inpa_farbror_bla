import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import {
  Button,
  Slide,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "../../store/actions/AuthActions";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { setFilter, dropFilter } from "../../store/actions/FilterActions";
import { Redirect } from "react-router";

//Hides the navigationbar when the user scrolls down
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/**
 * A component used for rendering the AppBar
 * @param {Object} props - contains a boolean for wether comoponent is open
 */
const Appbar = (props) => {
  //used for dispatching actions in the component
  const dispatch = useDispatch();

  // sets up a variable that allows access to firebase
  const firebase = useFirebase();

  //Anchors the menu component when the Appbar is open
  const [anchorEl, setAnchorEl] = useState(null);

  //Used for binding the dispatch of our SignOut action
  const boundSignOut = () => {
    dispatch(signOut(firebase));
    window.location.reload(false);
    /*Please forgive us*/
  };

  //Used for binding the dispatch of our SetFilter action
  const boundSetFilter = () => {
    dispatch(setFilter());
    handleMenuClose();
  };

  //Used for binding the dispatch of our DropFilter action (resets the filter)
  const boundDropFilter = () => {
    dispatch(dropFilter());
    handleMenuClose();
  };

  // used for setting components styles
  const classes = useStyles();

  //used for checking the authState data (error text and loading text)
  const auth = useSelector((state) => state.firebase.auth);

  //Used for opening the menu based a boolean value
  const isMenuOpen = Boolean(anchorEl);

  //Used for anchoring the profile Menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Used for closing the menu based a boolean value
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //Used for rendering the Menu component when the user clicks on menu icon
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={"primary-setting-menu"}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={boundDropFilter}>Alla händelser</MenuItem>
      <MenuItem onClick={boundSetFilter}>Sparade händelser</MenuItem>
      {auth.uid != null ? (
        <MenuItem onClick={boundSignOut}>Logga ut</MenuItem>
      ) : (
        <MenuItem onClick={() => props.handleOpen()}>Logga in</MenuItem>
      )}
    </Menu>
  );

  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Nära inpå farbror blå
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={"primary-setting-menu"}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuOpenIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMenu}
    </Fragment>
  );
};

export default Appbar;

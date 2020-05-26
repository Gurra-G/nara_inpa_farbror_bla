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

const Appbar = (props) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [anchorEl, setAnchorEl] = useState(null);
  const boundSignOut = () => dispatch(signOut(firebase));
  const boundSetFilter = () => {
    dispatch(setFilter());
    handleMenuClose();
  };
  const boundDropFilter = () => {
    dispatch(dropFilter());
    handleMenuClose();
  };
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-setting-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
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
              aria-controls={menuId}
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

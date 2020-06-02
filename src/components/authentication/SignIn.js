import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Fade,
  Backdrop,
  Modal,
  InputLabel,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { Mail, Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";

import { signIn, register } from "../../store/actions/AuthActions";
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    border: "none",
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    display: "block",
    margin: "40px auto 10px auto",
  },
  margin: {
    display: "block",
    margin: 20,
  },
}));

//Used to render a TabPanel componented based on passed in props
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={""}
      id={`simple-tabpanel-${""}`}
      aria-labelledby={`simple-tab-${""}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//Sets the Tab components attributes based on passed in index
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

/**
 * A component used for rendering the SingIn form and used for handling the users inputs
 * @param {Object} props - contains a booelan for wether comoponent is open and a function for closing the Modal
 */
const SignIn = (props) => {
  //used for dispatching actions in the component
  const dispatch = useDispatch();

  // sets up a variable that allows access to firebase
  const firebase = useFirebase();

  // used for setting components styles
  const classes = useStyles();

  //used for checking the authState data (error text and loading text)
  const authState = useSelector((state) => state.authState.data);

  //Local state which holds the users email, password and confirmedpassword. Confirmedpassword is used when registering a new user
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  //Local state that keep track of the current open Tab
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  //Used for binding the dispatch of our singIn action
  const boundSignIn = () => dispatch(signIn(firebase, values));

  //Used for binding the dispatch of our Register action
  const boundRegister = () => dispatch(register(firebase, values));

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = values;
    if (tabIndex === 0) {
      boundSignIn();
    } else {
      if (password === confirmPassword) {
        boundRegister();
        props.handleClose();
      }
    }
    setValues({ email: "", password: "", confirmPassword: "" });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <AppBar position="static">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Logga in" {...a11yProps(0)} />
              <Tab label="Registrera" {...a11yProps(1)} />
            </Tabs>
          </AppBar>

          <TabPanel value={tabIndex} index={tabIndex}>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
              id="signIn"
            >
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  type={"text"}
                  value={values.email}
                  onChange={handleChange("email")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Mail />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {tabIndex === 1 ? (
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type={values.showPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              ) : (
                ""
              )}
              <Typography paragraph color={authState.color}>
                {authState.text}
                {authState.success ? props.handleClose() : ""}
              </Typography>
              <Button
                className={classes.submitBtn}
                variant="contained"
                color="primary"
                type={"submit"}
              >
                {tabIndex === 0 ? "Logga in" : "Registrera"}
              </Button>
            </form>
          </TabPanel>
        </div>
      </Fade>
    </Modal>
  );
};

export default SignIn;

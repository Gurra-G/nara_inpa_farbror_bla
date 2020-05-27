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
import {
  Mail,
  Visibility,
  VisibilityOff,
  ContactsOutlined,
} from "@material-ui/icons";
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SignIn = (props) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const classes = useStyles();
  const authState = useSelector((state) => state.authState.data);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const boundSignIn = () => dispatch(signIn(firebase, values));

  const boundRegister = () => dispatch(register(firebase, values));

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = values;
    if (tabIndex === 0) {
      boundSignIn();
    } else {
      if (password === confirmPassword) {
        boundRegister();
      } else {
      }
    }

    // props.handleClose(); SHOULD WE CLOSE THE FORM AFTER SUCCESS??
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
                <InputLabel htmlFor="signInEmail">Email</InputLabel>
                <Input
                  id="signInEmail"
                  type={"text"}
                  value={values.email}
                  onChange={handleChange("signInEmail")}
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
                <InputLabel htmlFor="signInPassword">Password</InputLabel>
                <Input
                  id="signInPassword"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("signInPassword")}
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
                  <InputLabel htmlFor="confirmPassword">Password</InputLabel>
                  <Input
                    id="confirmPassword"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
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

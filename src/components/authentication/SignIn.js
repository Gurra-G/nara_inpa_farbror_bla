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
} from "@material-ui/core";
import {
  Mail,
  Visibility,
  VisibilityOff,
  ContactsOutlined,
} from "@material-ui/icons";
import clsx from "clsx";

import { signIn } from "../../store/actions/AuthActions";
import { useFirebase } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
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

const SignIn = (props) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const classes = useStyles();
  const authState = useSelector((state) => state.authState.data);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const boundSignIn = () => dispatch(signIn(firebase, values));

  const handleSubmit = (event) => {
    event.preventDefault();
    boundSignIn();
    // props.handleClose(); SHOULD WE CLOSE THE FORM AFTER SUCCESS??
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <h2 id="transition-modal-title">Sign in</h2>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
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
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography paragraph color={authState.color}>
              {authState.text}
            </Typography>
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              type={"submit"}
            >
              Logga in
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default SignIn;

import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Backdrop from "../UI/backdrop/Backdrop";
import useValidation from "../../hooks/useValidation";
import useHttp from "../../hooks/useHttp";
import { newUser, loginUser } from "../../lib/user-api";
import classes from "./Login.module.css";
import Loading from "../UI/loading/Loading";
import { loginAction } from "../../store/login-form-slice";
import { loginActionHandler } from "../../store/auth-actions";
import { showNotif } from "../../store/notification-actions";

const Login = () => {
  const dispatch = useDispatch();

  const {
    data: newUserData,
    sendRequest: newUserRequest,
    status: newUserStatus,
    error: newUserError,
    reset: newUserReset,
  } = useHttp(newUser);

  const {
    data: loginUserData,
    sendRequest: loginUserRequest,
    status: loginUserStatus,
    error: loginUserError,
    reset: loginUserReset,
  } = useHttp(loginUser);

  const [isLogin, setIsLogin] = useState(true);

  const {
    value: usernameValue,
    valueIsValid: usernameIsValid,
    valueHasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    valueReset: usernameReset,
  } = useValidation((value) => value !== "" || value.trim().length !== 0);

  const {
    value: emailValue,
    valueIsValid: emailIsValid,
    valueHasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    valueReset: emailReset,
  } = useValidation((value) => value !== "" || value.trim().length !== 0);

  const {
    value: passwordValue,
    valueIsValid: passwordIsValid,
    valueHasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    valueReset: passwordReset,
  } = useValidation((value) => value !== "" || value.trim().length !== 0);

  const hideLoginHandler = () => {
    dispatch(loginAction.hideLoginForm());
  };

  useEffect(() => {
    if (newUserStatus === "completed" && !newUserError) {
      loginUserRequest({
        email: emailValue,
        password: passwordValue,
      });
    }
  }, [newUserStatus, newUserError, dispatch]);

  useEffect(() => {
    if (loginUserStatus === "completed" && !loginUserError) {
      hideLoginHandler();
      dispatch(loginActionHandler(loginUserData));
      dispatch(showNotif(`Welcome`, "success"));
    }
  }, [loginUserStatus, loginUserError, loginUserData]);

  let formIsValid = false;
  if (isLogin && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  if (!isLogin && usernameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const loginHandler = () => {
    setIsLogin((state) => !state);
    usernameReset();
    emailReset();
    passwordReset();
    loginUserReset();
    newUserReset();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin && emailIsValid && passwordIsValid) {
      loginUserRequest({
        email: emailValue,
        password: passwordValue,
      });
    } else if (!isLogin && usernameIsValid && emailIsValid && passwordIsValid) {
      newUserRequest({
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      });
    }
  };

  const usernameClass = usernameHasError
    ? classes["input-invalid"]
    : classes.input;
  const emailClass = emailHasError ? classes["input-invalid"] : classes.input;
  const passwordClass = passwordHasError
    ? classes["input-invalid"]
    : classes.input;
  const buttonClass = !formIsValid ? classes["button-invalid"] : classes.button;

  let content = (
    <Fragment>
      <h2>{isLogin ? "Login" : "Sign up"}</h2>
      {loginUserStatus === "completed" && loginUserError && (
        <div className={classes.submiterror}>{loginUserError}</div>
      )}
      {newUserStatus === "completed" && newUserError && (
        <div className={classes.submiterror}>{newUserError}</div>
      )}
      {!isLogin && (
        <div className={classes.inputcontainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className={usernameClass}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={usernameValue}
          />
          {usernameHasError && <span>Please enter a valid username</span>}
        </div>
      )}
      <div className={classes.inputcontainer}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          className={emailClass}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailValue}
        />
        {emailHasError && <span>Please enter a valid email</span>}
      </div>
      <div className={classes.inputcontainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={passwordClass}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={passwordValue}
        />
        {passwordHasError && <span>Please enter a valid password</span>}
      </div>
      <button disabled={!formIsValid} className={buttonClass} type="submit">
        {isLogin ? "Login" : "Sign up"}
      </button>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a onClick={loginHandler}>{isLogin ? "Sign up" : "Login"}</a>
      </p>
    </Fragment>
  );

  if (newUserStatus === "pending" || loginUserStatus === "pending") {
    content = <Loading />;
  }

  return (
    <Fragment>
      <Backdrop onClick={hideLoginHandler} />
      <form className={classes.form} onSubmit={submitHandler}>
        {content}
      </form>
    </Fragment>
  );
};

export default Login;

import { authAction } from "./auth-slice";
import { getUser } from "../lib/user-api";

let logoutTimer;

export const loginActionHandler = (data = null) => {
  return async (dispatch) => {
    if (!localStorage.getItem("token") && data) {
      dispatch(authAction.login(data));
      const expirationDate = new Date(
        data.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("expiration", expirationDate);
      logoutTimer = setTimeout(() => {
        dispatch(authAction.logout());
      }, data.expiresIn * 1000);
      return;
    }
    if (localStorage.getItem("token") && !data) {
      const expirationTime = new Date(
        localStorage.getItem("expiration")
      ).getTime();
      const currentTime = new Date().getTime();
      if (expirationTime > currentTime) {
        const resData = await getUser(localStorage.getItem("token"));
        const userData = {
          token: localStorage.getItem("token"),
          expiresIn:
            (new Date(localStorage.getItem("expiration")).getTime() -
              currentTime) /
            1000,
          userId: resData.id,
        };
        dispatch(authAction.login(userData));
        logoutTimer = setTimeout(() => {
          dispatch(authAction.logout());
        }, expirationTime - currentTime);
      } else {
        dispatch(authAction.logout());
      }
    }
    return;
  };
};

export const logoutActionHandler = () => {
  return (dispatch) => {
    dispatch(authAction.logout());
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
};

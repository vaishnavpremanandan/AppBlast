import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification-slice";
import authSlice from "./auth-slice";
import loginFormSlice from "./login-form-slice";

const store = configureStore({
    reducer: {
        ui: notificationSlice.reducer,
        auth: authSlice.reducer,
        login: loginFormSlice.reducer
    }
});

export default store;
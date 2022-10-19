import { createSlice } from '@reduxjs/toolkit';

const loginFormSlice = createSlice({
    name: 'login',
    initialState: { show: false },
    reducers: {
        showLoginForm(state) {
            state.show = true;
        },
        hideLoginForm(state) {
            state.show = false;
        }
    }
});

export const loginAction = loginFormSlice.actions;

export default loginFormSlice;


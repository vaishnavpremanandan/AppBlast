import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    expiration: null,
    currentUserId: null
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.expiration = action.payload.expiresIn * 1000 + new Date().getTime();
            state.currentUserId = action.payload.userId;
            const expirationDate = new Date(state.expiration);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('expiration', expirationDate);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.expiration = null;
            state.currentUserId = null;
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        },
        loginAgain(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.expiration = new Date(action.payload.expirationDate).getTime();
            state.currentUserId = action.payload.userId;
        }
    }
});

export const authAction = authSlice.actions;

export default authSlice;
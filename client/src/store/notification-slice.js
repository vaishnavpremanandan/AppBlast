import { createSlice } from '@reduxjs/toolkit';

const init = {
    type: null,
    message: null,
    show: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: init,
    reducers: {
        successNotif(state, action) {
            state.type = 'success';
            state.message = action.payload;
            state.show = true;
        },
        errorNotif(state, action) {
            state.type = 'error';
            state.message = action.payload;
            state.show = true;
        },
        hideNotif(state) {
            state.show = false;
        },
    }
});

export const notificationAction = notificationSlice.actions;

export default notificationSlice;

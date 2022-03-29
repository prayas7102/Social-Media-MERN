import { createReducer } from "@reduxjs/toolkit";
const initialState = {}
export const userReducer = (initialState, {
    loginRequest: (state, action) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.user=action.payload;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error=action.payload;
    },
    RegisterRequest: (state, action) => {
        state.loading=true;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user=action.payload;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.user=action.payload;
    },
})
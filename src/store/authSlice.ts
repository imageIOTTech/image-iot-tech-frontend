import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    id: null,
    name: null,
    email: null,
    roles: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.tokenType = action.payload.tokenType;
            state.refreshToken = action.payload.refreshToken;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.roles = action.payload.roles;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.tokenType = null;
            state.refreshToken = null;
            state.id = null;
            state.name = null;
            state.email = null;
            state.roles = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
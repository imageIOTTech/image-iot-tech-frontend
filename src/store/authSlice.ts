import { createSlice } from "@reduxjs/toolkit"
import UserResponseModel from "../models/UserResponse";
import { fetchLogin, fetchOtp, fetchRefreshToken, fetchRegister } from "../hooks/fetchUser";

type initialStateProps = {
    isAuthenticated: boolean,
    message: string,
    status: string,
    user: UserResponseModel,
}

const initialState: initialStateProps = {
    isAuthenticated: false,
    message: '',
    status: '',
    user: {
        accessToken: '',
        tokenType: '',
        refreshToken: '',
        id: '',
        name: '',
        email: '',
        roles: '',
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
        resetStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                //Pending
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                //Sucessful
                if (action.payload == 200) {
                    state.status = "Login done"
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                //Reject
            })
            .addCase(fetchOtp.pending, (state, action) => {
                //Pending

            })
            .addCase(fetchOtp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                const user = action.payload;
                state.user.accessToken = user.accessToken;
                state.user.tokenType = user.tokenType;
                state.user.refreshToken = user.refreshToken;
                state.user.id = user.id;
                state.user.name = user.name;
                state.user.email = user.email;
                state.user.roles = user.roles;
            })
            .addCase(fetchOtp.rejected, (state, action) => {
                //Reject
            })
            .addCase(fetchRegister.pending, (state, action) => {
                //Pending
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                //Sucessful
                if (action.payload == 200) {
                    state.status = "Register done"
                }
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                //Reject
            })
            .addCase(fetchRefreshToken.pending, (state, action) => {
                //Pending
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                state.user.refreshToken = action.payload.refreshToken;
                state.user.accessToken = action.payload.accessToken;
            })
            .addCase(fetchRefreshToken.rejected, (state, action) => {
                //Pending
            })
    },
});

export const { logout, resetStatus } = authSlice.actions;
export default authSlice.reducer;
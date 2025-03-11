import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { SERVER_PORT } from "../config/env";
import UserModel from "../models/User";
import OtpModel from "../models/Otp";

const fetchRefreshToken = createAsyncThunk(
    'user/refreshToken',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_PORT}/user/refresh-token`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { token }
                )
            });

            if (!response) {
                new Error('Fail to get project')
            }
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const fetchLogin = createAsyncThunk(
    'user/getUser',
    async (user: UserModel, { rejectWithValue }) => {
        try {

            const response = await fetch(`${SERVER_PORT}/login/local`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
            if (!response) {
                new Error('Fail to get project')
            }
            return await response.status;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const fetchOtp = createAsyncThunk(
    'user/otp',
    async (otp: OtpModel, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_PORT}/user/verify-otp`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(otp)
                });
            if (!response) {
                new Error('Fail to get project')
            }
            const json = response.json();
            //Save user and token
            json.then((result) => {
                console.log(result)
            });
            return await response.json();
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const fetchRegister = createAsyncThunk(
    'user/register',
    async (user: UserModel, { rejectWithValue }) => {
        try {
            const response = await fetch(`${SERVER_PORT}/register`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
            if (!response) {
                new Error('Fail to get project')
            }
            return await response.status;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export { fetchLogin, fetchRegister, fetchOtp, fetchRefreshToken }
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/ApiCalls";

const LOGIN_USER_ACTION = "loginUserAction";
export const loginUserAction = createAsyncThunk(
    LOGIN_USER_ACTION,
    async (credentials) => {
        try {
            const response = await login(credentials);
            return response
        } catch (error) {
            throw error
        }
    }
);



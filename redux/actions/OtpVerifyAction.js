import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyOtp } from "../../services/ApiCalls";

const OTP_VERIFY_ACTION = "otpVerifyAction";
export const otpVerifyAction = createAsyncThunk(
    OTP_VERIFY_ACTION,
    async (credentials) => {
        try {
            const response = await verifyOtp(credentials);
            return response
        } catch (error) {
            return error
        }
    }
);


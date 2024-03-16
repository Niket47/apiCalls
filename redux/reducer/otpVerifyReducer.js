
import { createSlice, } from '@reduxjs/toolkit';
import { otpVerifyAction } from '../actions/OtpVerifyAction';


const initialState = {
    data: null,
    isLoading: false,
    error: null,
}

const otpVerifySlice = createSlice({
    name: 'otpVerifyReducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(otpVerifyAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(otpVerifyAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(otpVerifyAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            });
    },
});

export default otpVerifySlice.reducer;

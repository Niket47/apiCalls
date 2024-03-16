
import { createSlice, } from '@reduxjs/toolkit';
import { loginUserAction } from '../actions/loginUserAction';


const initialState = {
    data: null,
    isLoading: false,
    error: null,
}

const loginReducerSlice = createSlice({
    name: 'loginReducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            });
    },
});

export default loginReducerSlice.reducer;

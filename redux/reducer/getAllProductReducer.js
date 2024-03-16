
import { createSlice, } from '@reduxjs/toolkit';
import { getAllProductsAction } from '../actions/getAllProductsAction';


const initialState = {
    data: null,
    isLoading: false,
    error: null,
}

const getAllProductsSlice = createSlice({
    name: 'getAllProductsReducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllProductsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            });
    },
});

export default getAllProductsSlice.reducer;

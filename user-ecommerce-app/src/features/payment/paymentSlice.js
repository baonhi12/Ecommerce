import { createSlice , createAsyncThunk , createAction } from '@reduxjs/toolkit';

export const resetState = createAction("Reset_all");

const initialState = {
    payment: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},  
    extraReducers: (builder) => {
        builder
            .addCase(resetState.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetState.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(resetState.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            });
    },
});
import { createSlice , createAsyncThunk , createAction } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';

export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAEnquiry = createAsyncThunk('enquiry/delete-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.deleteEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAEnquiry = createAsyncThunk('enquiry/get-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.getEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAEnquiry = createAsyncThunk('enquiry/update-enquiry', async (enquiry, thunkAPI) => {
    try {
        return await enquiryService.updateEnquiry(enquiry);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const enquirySlice = createSlice({
    name: "enquiries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            
            .addCase(deleteAEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            })
            .addCase(deleteAEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(getAEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.enquiryName = action.payload.name;
                state.enquiryMobile = action.payload.mobile;
                state.enquiryEmail = action.payload.email;
                state.enquiryComment = action.payload.comment;
                state.enquiryStatus = action.payload.status;

            })
            .addCase(getAEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(updateAEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAEnquiry.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
            })
            .addCase(updateAEnquiry.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            
            .addCase(resetState, () => initialState); 
    },
});

export default enquirySlice.reducer;
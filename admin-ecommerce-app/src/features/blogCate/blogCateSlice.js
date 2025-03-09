import { createSlice , createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogCateService from './blogCateService';

export const getBlogsCate = createAsyncThunk('blogCate/get-blogsCate', async (thunkAPI) => {
    try {
        return await blogCateService.getBlogsCate();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlogCategory = createAsyncThunk('blogCate/get-blogCate', async (id, thunkAPI) => {
    try {
        return await blogCateService.getBlogCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategory = createAsyncThunk('blogCategory/create-blogCategory', async (blogCateData, thunkAPI) => {
    try {
        return await blogCateService.createBlogCategory(blogCateData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateABlogCategory = createAsyncThunk('blogCate/update-blogCate', async (blogCate, thunkAPI) => {
    try {
        return await blogCateService.updateBlogCategory(blogCate);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteABlogCategory = createAsyncThunk('blogCate/delete-blogCate', async (id, thunkAPI) => {
    try {
        return await blogCateService.deleteBlogCategory(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    blogsCate: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogCateSlice = createSlice({
    name: "blogsCate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogsCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogsCate.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogsCate = action.payload;
            })
            .addCase(getBlogsCate.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createBlogCate = action.payload;
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(getABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blogCateName = action.payload.title;
            })
            .addCase(getABlogCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(updateABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateABlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedBlogCate = action.payload;
            })
            .addCase(updateABlogCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(deleteABlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteABlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedBlogCate = action.payload;
            })
            .addCase(deleteABlogCategory.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })
            
            .addCase(resetState, () => initialState); 
    },
});

export default blogCateSlice.reducer;
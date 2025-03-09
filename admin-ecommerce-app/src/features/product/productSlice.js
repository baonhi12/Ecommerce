import { createSlice , createAsyncThunk , createAction } from '@reduxjs/toolkit';
import productService from './productService';

export const getProducts = createAsyncThunk('product/get-products', async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk('product/get-product', async (id, thunkAPI) => {
    try {
        return await productService.getProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProduct = createAsyncThunk('product/create-products', async (productData, thunkAPI) => {
    try {
        return await productService.createProduct(productData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAProduct = createAsyncThunk('product/update-product', async (product, thunkAPI) => {
    try {
        return await productService.updateProduct(product);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAProduct = createAsyncThunk('product/delete-product', async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    products: [],
    // createProduct: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.productName = action.payload.title;
                state.productDesc = action.payload.description;
                state.productPrice = action.payload.price;
                state.productBrand = action.payload.brand;
                state.productCategory = action.payload.category;
                state.productColor = action.payload.color;
                state.productQuantity = action.payload.quantity;
                state.productTags = action.payload.tags;
                state.productImages = action.payload.images;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
            })
            .addCase(updateAProduct.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(deleteAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteAProduct.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                state.isLoading = false;
            })

            .addCase(resetState, () => initialState); 
    },
});

export default productSlice.reducer;
import axios from "axios";
import { base_url, config } from '../../utils/axiosConfig';

// const getProducts = async (data) => {
//     console.log(data);
//     const response = await axios.get(`${base_url}product?
//         ${data?.brand? `brand=${data?.brand} &&` : ""}
//         ${data?.tag? `tags=${data?.tag} &&` : ""}
//         ${data?.category? `category=${data?.category} &&` : ""}
//         ${data?.minPrice? `price[gte]=${data?.minPrice} &&` : ""}
//         ${data?.maxPrice? `price[lte]=${data?.maxPrice} &&` : ""}
//         ${data?.sort? `sort=${data?.sort} &&` : ""}
//     `);
//     if (response.data) {
//         return response.data;
//     }
// };

const getProducts = async (data) => {
    console.log(data);

    const params = new URLSearchParams();

    if (data?.brand) params.append('brand', data.brand);
    if (data?.tag) params.append('tags', data.tag);
    if (data?.category) params.append('category', data.category);
    if (data?.minPrice) params.append('price[gte]', data.minPrice);
    if (data?.maxPrice) params.append('price[lte]', data.maxPrice);
    if (data?.sort) params.append('sort', data.sort);

    const response = await axios.get(`${base_url}product?${params.toString()}`);

    if (response.data) {
        return response.data;
    }
};


const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prodId) => {
    console.log(prodId);
    const response = await axios.put(`${base_url}product/wishlist`, {prodId} , config);
    if (response.data) {
        return response.data;
    }   
};

const rateProduct = async (data) => {
    const response = await axios.put(`${base_url}product/rating`, data , config);
    if (response.data) {
        return response.data;
    }   
};

export const productService = {
    getProducts,
    addToWishlist,
    getSingleProduct, 
    rateProduct, 
}
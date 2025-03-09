import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogsCate = async () => {
    const response = await axios.get(`${base_url}blogCategory/`);
    return response.data;
};

const createBlogCategory = async (blogCategory) => {
    const response = await axios.post(`${base_url}blogCategory/`, blogCategory, config);
    return response.data;
};

const updateBlogCategory = async (blogCategory) => {
    const response = await axios.put(`${base_url}blogCategory/${blogCategory.id}`, {title: blogCategory.blogCategoryData.title}, config);
    return response.data;
};

const getBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogCategory/${id}`, config);
    return response.data;
};

const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
    return response.data;
};

const blogCateService = {
    getBlogsCate,
    createBlogCategory,
    updateBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
};

export default blogCateService;
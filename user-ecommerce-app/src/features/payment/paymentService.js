import axios from "axios";
import { base_url } from "../../utils/axiosConfig"; 

export const getConfig = async (data, access_token) => {
    const response = await axios.get(`${base_url}payment/config`);
    if (response.data) {
        return response.data;
    }
};

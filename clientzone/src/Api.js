import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const fetchBrands = async () => {
    const response = await axios.get(`${API_URL}/brands`);
    return response.data;
};

export const createOrder = async (order) => {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
};


import axios from 'axios';

const API_BASE_URL = 'http://localhost/My%20projects/hackathon-fti2025/php/api/products.php';

// Axios default to include session cookies
axios.defaults.withCredentials = true;

export const getProducts = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await axios.post(API_BASE_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(API_BASE_URL, {
            data: { product_id: productId },
        });
        console.log('Product deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const data = { ...productData, product_id: productId };
        const response = await axios.put(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Update error:", error.response?.data || error.message);
        throw error;
    }
};

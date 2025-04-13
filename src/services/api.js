import axios from 'axios';
const API_BASE_URL = 'http://localhost/My%20projects/Portfolio%20site/merrbio-farmerdashboard/merrbio/php/api/products.php';
const FARMER_ID = 1;
export const getProducts = async() => {
    try{
        const response = await axios.get(`${API_BASE_URL}?farmer_id=${FARMER_ID}`);
        console.log('API Response:', response.data);
        return response.data;
    }catch(error){
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const addProduct = async(productData) => {
    try {
        const { emri, pershkrimi, cmimi, sasia, kategoria, origjina } = productData;
        const data = {
            emri,
            pershkrimi,
            cmimi,
            sasia,
            kategoria,
            origjina,
            farmer_id: FARMER_ID
        };
        const response = await axios.post(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const data = {
            product_id: productId,
            farmer_id: FARMER_ID
        };

        const response = await axios.delete(API_BASE_URL, { data });
        console.log('Product deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const data = { ...productData, product_id: productId, farmer_id: FARMER_ID };
        const response = await axios.put(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
};




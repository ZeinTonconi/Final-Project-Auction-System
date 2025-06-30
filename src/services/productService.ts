
import type {Product} from "../interfaces/ProductInterface.ts";
import jsonServerInstance from "../api/jsonServerInstance.ts";

const PRODUCTS_URL = 'products'

export const getProductsService = async () => {
    try {
        const res = await jsonServerInstance.get(PRODUCTS_URL);
        return res.data;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
}

export const createProductService = async (product: Product) => {
    try {
        const res = await jsonServerInstance.post(PRODUCTS_URL, product);
        return res.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const updateProductService = async (product: Product) => {
    try {
        const res = await jsonServerInstance.put(`${PRODUCTS_URL}/${product.id}`, product);
        return res.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export const deleteProductService = async (id: string) => {
    try {
        const res = await jsonServerInstance.delete(`${PRODUCTS_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

import { create } from "zustand";
import type { Product } from "../interfaces/ProductInterface";
import { createProductService, deleteProductService, getProductsService, updateProductService } from "../services/productService";

interface ProductsStore {
  products: Product[];

  getProducts: () => void;
  createProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  getProducts: async () => {
    try {
      const res = await getProductsService();
        set({products: res})
    } catch (error) {
      console.error(error);
    } 
  },
  createProduct: async (product: Product) => {
    try{
        const res = await createProductService(product)
        set((prev) => ({
            products: [...prev.products, res]
        }))
    } catch (error) {
      console.error(error);
    } 
  },
  updateProduct: async (product: Product) => {
    try {
        const res = await updateProductService(product)
        set((prev) => ({
            products: prev.products.map((prod) => prod.id === res.id ? res: prod)
        }))
    } catch (error) {
        console.error(error)
    }

  },
  deleteProduct: async (product: Product) => {
    try {
        const {id} = product
        await deleteProductService(id!)
        set((prev) => ({
            products: prev.products.filter((prod) => prod.id !== id)
        }))

    } catch (error) {
        console.error(error)
    }

  },
}));


import * as Yup from 'yup'
import { useEffect, useState } from "react";
import type { Product } from "../interfaces/ProductInterface";
import { useProductsStore } from "../store/useProductsStore";
import { useFormik } from 'formik';


export const useProductManagement = () => {
    
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const {
        products,
        getProducts,
        createProduct,
        deleteProduct,
        updateProduct
    } = useProductsStore(state => state)

    useEffect(() => {
        getProducts();
    }, []);

    const handleClose = () => {
        setOpen(false);
        setEditingProduct(null);
        formik.resetForm();
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        formik.setValues(product);
        setOpen(true);
    };

    const handleDelete = async (product: Product) => {
        deleteProduct(product)
    };

    const productSchema = Yup.object({
        title: Yup.string().required("Title is Required"),
        description: Yup.string().required("Description is Required"),
        image: Yup.string().required("Image is Required"),
        basePrice: Yup.number().min(1, "Can not be less than 1").required("Required")
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",
            basePrice: 0
        },
        validationSchema: productSchema,
        onSubmit: async (values) => {
            if (editingProduct) {
                updateProduct({...editingProduct, ...values})
            } else {
                createProduct(values)
            }
            handleClose();
        },
    });
    return {
        setOpen,
        products,
        handleEdit,
        handleDelete,
        handleClose,
        editingProduct,
        formik,
        open
    }
}
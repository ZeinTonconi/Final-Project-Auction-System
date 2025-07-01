import {useEffect, useState} from "react";
import {
    Container,
    Typography,
    Button,
    Box,
    TextField,
    Grid, Stack, Avatar
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {FormDialog} from "../components/FormDialog.tsx";
import {ProductsTable} from "../components/ProductsTable.tsx";
import type { Product } from "../interfaces/ProductInterface.ts";
import { useProductsStore } from "../store/useProductsStore.ts";

function ProductManagementPage() {

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


    return (
        <Container>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems={{xs: "stretch", sm: "center"}}
                flexDirection={{xs: "column", sm: "row"}}
                gap={2}
                my={2}
            >
                <Typography variant="h5" component="h1">
                    Product Management
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    fullWidth={true}
                    sx={{maxWidth: {sm: "200px"}}}
                >
                    Add Product
                </Button>
            </Box>

            <ProductsTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FormDialog
                open={open}
                onClose={handleClose}
                title={editingProduct ? "Edit Product" : "Add Product"}
                onSubmit={formik.handleSubmit}
                fullWidth
                maxWidth="md"
            >
                <Grid
                    container
                    spacing={2}
                    alignItems="stretch"
                >
                    <Grid size={{xs: 12, sm: 6}}
                          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>

                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                minRows={4}
                                maxRows={6}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.description &&
                                    Boolean(formik.errors.description)
                                }
                                helperText={
                                    formik.touched.description && formik.errors.description
                                }
                            />
                            <TextField
                                fullWidth
                                label="Base Price"
                                name="basePrice"
                                type="number"
                                value={formik.values.basePrice}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.basePrice && Boolean(formik.errors.basePrice)
                                }
                                helperText={
                                    formik.touched.basePrice && formik.errors.basePrice
                                }
                            />
                            {/*<TextField*/}
                            {/*    fullWidth*/}
                            {/*    label="Category"*/}
                            {/*    name="category"*/}
                            {/*    value={formik.values.category}*/}
                            {/*    onChange={formik.handleChange}*/}
                            {/*    error={*/}
                            {/*        formik.touched.category && Boolean(formik.errors.category)*/}
                            {/*    }*/}
                            {/*    helperText={formik.touched.category && formik.errors.category}*/}
                            {/*/>*/}
                        </Stack>
                    </Grid>

                    <Grid
                        size={{xs: 12, sm: 6}}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            flexGrow: 1
                        }}
                    >
                        <Typography variant="subtitle1">Product Image</Typography>

                        <Avatar
                            variant="square"
                            src={formik.values.image}
                            sx={{width: 240, height: 240}}
                        />

                        <Button
                            variant="outlined"
                            component="label"
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        formik.setFieldValue("image", reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </Button>
                    </Grid>
                </Grid>


            </FormDialog>
        </Container>
    );
};

export default ProductManagementPage;

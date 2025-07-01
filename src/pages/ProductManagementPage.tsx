import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";
import { FormDialog } from "../components/FormDialog.tsx";
import { ProductsTable } from "../components/ProductsTable.tsx";
import { useProductManagement } from "../hooks/useProductManagement.ts";
import { useTranslation } from "react-i18next";

function ProductManagementPage() {
  const {
    setOpen,
    products,
    handleClose,
    handleDelete,
    handleEdit,
    editingProduct,
    formik,
    open,
  } = useProductManagement();

  const { t } = useTranslation();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        my={2}
      >
        <Typography variant="h5" component="h1">
          {t("productManagement.title")}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          fullWidth={true}
          sx={{ maxWidth: { sm: "200px" } }}
        >
          {t("productManagement.addProduct")}
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
        title={
          editingProduct
            ? t("productManagement.editProduct")
            : t("productManagement.addProduct")
        }
        onSubmit={formik.handleSubmit}
        fullWidth
        maxWidth="md"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label={t("productManagement.formTitle")}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                label={t("productManagement.description")}
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
                label={t("productManagement.basePrice")}
                name="basePrice"
                type="number"
                value={formik.values.basePrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.basePrice && Boolean(formik.errors.basePrice)
                }
                helperText={formik.touched.basePrice && formik.errors.basePrice}
              />
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Typography variant="subtitle1">{t("productManagement.image")}</Typography>

            <Avatar
              variant="square"
              src={formik.values.image}
              sx={{ width: 240, height: 240 }}
            />

            <Button variant="outlined" component="label">
              {t("productManagement.uploadImage")}
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
}

export default ProductManagementPage;

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Stack,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { UsersTable } from "../components/UsersTable";
import { FormDialog } from "../components/FormDialog";
import { useUserManagement } from "../hooks/useUserManagement";
import { useTranslation } from "react-i18next";

export default function UserManagementPage() {
  const {
    setOpenForm,
    users,
    handleDelete,
    handleEdit,
    setEditingUser,
    formik,
    openForm,
    editingUser,
  } = useUserManagement();

  const {t} = useTranslation()

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Typography variant="h5">{t("userManagement.title")}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          {t("userManagement.addUser")}
        </Button>
      </Box>

      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <FormDialog
        onClose={() => {
          setOpenForm(false);
          setEditingUser(null);
          formik.resetForm();
        }}
        onSubmit={formik.handleSubmit}
        open={openForm}
        title={
          editingUser ? `${t("userManagement.edit")} ${editingUser.username}` : t("userManagement.addUser")
        }
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label={t("userManagement.name")}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="role"
                    checked={formik.values.role}
                    onChange={formik.handleChange}
                  />
                }
                label={t("userManagement.isAdmin")}
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
            <Typography variant="subtitle1">{t("userManagement.image")}</Typography>

            <Avatar
              variant="square"
              src={formik.values.avatar}
              sx={{ width: 240, height: 240 }}
            />

            <Button variant="outlined" component="label">
              {t("userManagement.upload")}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    formik.setFieldValue("avatar", reader.result as string);
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

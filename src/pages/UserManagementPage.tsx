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
import { useEffect, useState } from "react";
import { UsersTable } from "../components/UsersTable";
import { type User } from "../interfaces/UserInterface";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../services/userService";
import { FormDialog } from "../components/FormDialog";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UserManagementPage() {
  const [openForm, setOpenForm] = useState(false);

  const [users, setUsers] = useState<User[]>([]);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const userSchema = Yup.object({
    username: Yup.string().required("The username is required"),
    name: Yup.string().required("The name is required"),
    role: Yup.boolean(),
    avatar: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      avatar: "",
      username: "",
      name: "",
      role: false,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const user: User = {
        ...editingUser,
        ...values,
        role: values.role ? "admin" : "user",
      };

      if (editingUser) {
        const updatedUser = await updateUserService(user);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
        );
      } else {
        const res = await createUserService(user);
        setUsers((prev) => [...prev, res]);
      }

      setEditingUser(null);
      setOpenForm(false);
      formik.resetForm();
    },
  });

  const fetchUsers = async () => {
    const res = await getUsersService();
    setUsers(res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    formik.setValues({
      avatar: user.avatar || "",
      username: user.username,
      name: user.name,
      role: user.role === "admin",
    });
    setOpenForm(true);
  };

  const handleDelete = async (user: User) => {
    await deleteUserService(user.id!);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Typography variant="h5">User Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          Add User
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
          editingUser ? `Editing ${editingUser.username}` : "Creating a User"
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
                label="Name"
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
                label="Is admin?"
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
            <Typography variant="subtitle1">Avatar Image</Typography>

            <Avatar
              variant="square"
              src={formik.values.avatar}
              sx={{ width: 240, height: 240 }}
            />

            <Button variant="outlined" component="label">
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

import * as Yup from "yup";
import { useEffect, useState } from "react";
import type { User } from "../interfaces/UserInterface";
import { useFormik } from "formik";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../services/userService";

export const useUserManagement = () => {
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

  return {
    setOpenForm,
    users,
    handleEdit,
    handleDelete,
    setEditingUser,
    formik,
    openForm,
    editingUser,
  };
};

import { useFormik } from "formik";
import * as Yup from "yup";

import { loginService } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext.tsx";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const loginSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
    avatar: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      username: "hade",
      role: "user",
      avatar: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const user = await loginService(values.username, values.role);
      console.log(user);
      if (user) {
        login(user);
        if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/dashboard");
      }
    },
  });
  return {formik}
};

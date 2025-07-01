import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {AvatarUpload} from "../components/AvatarComponent.tsx";
import {loginService} from "../services/authService.ts";
import {useNavigate} from "react-router-dom";
import {useUser} from "../contexts/userContext.tsx";

interface LoginFormValues {
    username: string;
    role: string;
    avatar: string;
}

function LoginPage() {

    const navigate = useNavigate();
    const {login} = useUser();

    const loginSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        role: Yup.string().required("Role is required"),
        avatar: Yup.string().optional(),
    })

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: "hade",
            role: "user",
            avatar: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const user = await loginService(values.username, values.role);
            console.log(user)
            if (user) {
                login(user)
                if(user.role === "admin")
                    navigate("/admin/dashboard");
                else
                    navigate("/dashboard");
            }
        },
    });

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                    Login
                </Typography>

                <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
                    <AvatarUpload
                        avatarSrc={formik.values.avatar}
                        onAvatarChange={(avatar) => {
                            formik.setFieldValue("avatar", avatar);
                        }}
                    />

                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        sx={{mb: 2}}
                    />

                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            label="Role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;

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
import {AvatarUpload} from "../components/AvatarComponent.tsx";
import { useLogin } from "../hooks/useLogin.ts";
import { useTranslation } from "react-i18next";


function LoginPage() {

    const {formik} = useLogin()      
    const { t } = useTranslation();

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
                    {t("login.title")}
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
                            label= {t("login.role")}
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button color="primary" variant="contained" fullWidth type="submit">
                         {t("login.title")}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;

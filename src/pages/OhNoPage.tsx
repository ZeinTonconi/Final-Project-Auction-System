import { Button, Container, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface OhNoPageProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function OhNoPage({ error, resetErrorBoundary }: OhNoPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleGoHome = () => {
    resetErrorBoundary();
    navigate("/dashboard");
  };

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        😵 {t("ohNo.title")}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {error.message}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleGoHome}>
          {t("ohNo.back")}
        </Button>
        <Button variant="outlined" onClick={resetErrorBoundary}>
          {t("ohNo.tryAgain")}
        </Button>
      </Stack>
    </Container>
  );
}

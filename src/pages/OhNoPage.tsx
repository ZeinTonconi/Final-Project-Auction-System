import { Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface OhNoPageProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function OhNoPage({ error, resetErrorBoundary }: OhNoPageProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetErrorBoundary(); 
    navigate("/dashboard"); 
  };

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        😵 Oh no! Something went wrong.
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {error.message}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
        <Button variant="contained" onClick={handleGoHome}>
          Go back to Dashboard
        </Button>
        <Button variant="outlined" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </Stack>
    </Container>
  );
}

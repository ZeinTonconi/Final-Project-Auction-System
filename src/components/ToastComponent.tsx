import { Alert, Snackbar } from "@mui/material";

interface ToastComponentProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export const ToastComponent = ({ open, handleClose, message, severity }: ToastComponentProps) => {
  return (<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity={severity}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>);
};
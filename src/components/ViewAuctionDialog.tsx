import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  Typography,
  useTheme,
  Divider,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import GavelIcon from '@mui/icons-material/Gavel';
import type { Auction } from "../interfaces/AuctionInterface";
import { CountdownTimer } from "./CountdownTimer";
import { useState } from "react";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useUser } from "../contexts/userContext";
import { updateAuctionService } from "../services/auctionService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: theme.breakpoints.values.md + "px",
  },
}));

interface ViewAuctionDialogProps {
  open: boolean;
  handleClose: () => void;
  auction: Auction;
}

export const ViewAuctionDialog = ({
  open,
  handleClose,
  auction,
}: ViewAuctionDialogProps) => {
  const { product } = auction;
  const theme = useTheme();

  if (!product) return null;

  const isActive =
    new Date(auction.startTime).getTime() < Date.now() &&
    Date.now() < new Date(auction.endTime).getTime();

  const isUpcoming = Date.now() < new Date(auction.startTime).getTime();
  
  const navigate= useNavigate();

  const {t} = useTranslation()

  return (
    <>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {product.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} alignItems="center">
            <Grid
              size={{ sm: 5, xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack spacing={4}>
                <Avatar
                  variant="square"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: { xs: 200, sm: 240 },
                    height: { xs: 200, sm: 240 },
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
                <Button
                  variant="contained" endIcon={<GavelIcon />}
                  onClick={() => navigate(`/bid-history/${auction.id}`)}
                >
                  {(!isActive && !isUpcoming) ? t("viewAuction.see") : t("viewAuction.place")}
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ sm: 7, xs: 12 }}>
              <Stack spacing={1}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t("viewAuction.description")}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {t("viewAuction.details")}
                </Typography>
                <Typography>
                  <strong>Base {t("viewAuction.price")}:</strong> ${product.basePrice}
                </Typography>
                {!isUpcoming && (
                  <Typography>
                    <strong>
                      {!isActive
                        ? t("viewAuction.final")
                        : t("viewAuction.current")}
                    </strong>{" "}
                    ${auction.currentPrice}
                  </Typography>
                )}

                <Typography>
                  <strong>{t("viewAuction.start")}:</strong>{" "}
                  {new Date(auction.startTime).toDateString()}
                </Typography>
                <Typography>
                  <strong>{t("viewAuction.end")}:</strong>{" "}
                  {new Date(auction.endTime).toDateString()}
                </Typography>
                <Typography>
                  <strong>{t("viewAuction.status")}:</strong> {isActive ? t("viewAuction.active") : t("viewAuction.inactive")}
                </Typography>
                {isActive && (
                  <>
                    <Typography>
                      <strong>{t("viewAuction.endIn")}:</strong>
                    </Typography>

                    <CountdownTimer
                      endTime={new Date(auction.endTime).getTime()}
                    />
                  </>
                )}
                {isUpcoming && (
                  <>
                    <Typography>
                      <strong>{t("viewAuction.startIn")}:</strong>
                    </Typography>

                    <CountdownTimer
                      endTime={new Date(auction.startTime).getTime()}
                    />
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

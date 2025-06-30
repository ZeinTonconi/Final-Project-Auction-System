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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import type { Auction } from "../interfaces/AuctionInterface";
import { CountdownTimer } from "./CountdownTimer";
import { useState } from "react";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useUser } from "../contexts/userContext";
import { updateAuctionService } from "../services/auctionService";

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

  const [bid, setBid] = useState<string>("");

  const numericBid = parseInt(bid, 10);
  const isBidValid = !isNaN(numericBid) && numericBid > auction.currentPrice;

  const { makeBid } = useAuctionsStore((state) => state);
  const { user } = useUser();

  return (
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
              <Stack direction="row">
                <TextField
                  label="Place your bid"
                  variant="standard"
                  type="number"
                  value={bid}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setBid(value);
                    }
                  }}
                  error={bid !== "" && !isBidValid}
                  helperText={
                    bid !== "" && !isBidValid
                      ? `Bid must be greater than $${auction.currentPrice}`
                      : ""
                  }
                  inputProps={{ min: 0 }}
                />
                <IconButton
                  color="primary"
                  disabled={!isBidValid}
                  onClick={() => {
                    const newBid =  parseInt(bid, 10)
                    const now = new Date(Date.now()).toISOString()
                    const newAuction = {
                      ...auction,
                      currentPrice: newBid,
                      userId: user!.id!,
                      lastBid: now,
                    };

                    updateAuctionService(newAuction);
                    makeBid(
                      auction,
                      newBid,
                      user!.id!,
                      now
                    );
                    setBid("");
                    handleClose();
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ sm: 7, xs: 12 }}>
            <Stack spacing={1}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="text.secondary" gutterBottom>
                Auction Details
              </Typography>
              <Typography>
                <strong>Base Price:</strong> ${product.basePrice}
              </Typography>
              <Typography>
                <strong>Current Price:</strong> ${auction.currentPrice}
              </Typography>
              <Typography>
                <strong>Start Time:</strong>{" "}
                {new Date(auction.startTime).toDateString()}
              </Typography>
              <Typography>
                <strong>End Time:</strong>{" "}
                {new Date(auction.endTime).toDateString()}
              </Typography>
              <Typography>
                <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
              </Typography>
              {isActive && (
                <>
                  <Typography>
                    <strong>Ends in:</strong>
                  </Typography>

                  <CountdownTimer
                    endTime={new Date(auction.endTime).getTime()}
                  />
                </>
              )}
              {isUpcoming && (
                <>
                  <Typography>
                    <strong>Starts in:</strong>
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
  );
};

import {
  Avatar,
  Box,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { type Bid } from "../interfaces/BidInterface";
import type { Auction } from "../interfaces/AuctionInterface";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/userContext";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useAuctionSSE } from "../hooks/useAuctionSSE";

interface BidChatProps {
  bids: Bid[];
  auction?: Auction;
}

export const BidChat = ({ bids, auction }: BidChatProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const { user } = useUser();

  useAuctionSSE();

  const isActive =
    auction &&
    new Date(auction.startTime).getTime() <= Date.now() &&
    Date.now() <= new Date(auction.endTime).getTime();

  let placeholder = "Enter your bid...";
  let disabled = !isActive || user?.role === "admin";
  if (!isActive) {
    placeholder =
      auction && new Date(auction.endTime).getTime() < Date.now()
        ? "Auction has ended"
        : "Auction not started yet";
  } else if (user?.role === "admin") {
    placeholder = "Admins cannot place bids";
  }

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bids]);

  const { makeBid } = useAuctionsStore((state) => state);

  const handlePlaceBid = async () => {
    const newBid = parseInt(bidAmount, 10);
    const now = new Date(Date.now()).toISOString();

    makeBid(auction!, newBid, user!.id!, now, user!);
    setBidAmount("");
  };

  return (
    <Stack spacing={1}>
      {bids.map((bid: Bid) => (
        <Paper
          key={`${bid.amount}-${auction?.id}`}
          sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Avatar src={bid.user!.avatar} />
          <Box>
            <Typography fontWeight="bold">{bid.user?.name}</Typography>
            <Typography>$ {bid.amount}</Typography>
            <Typography variant="caption">
              {new Date(bid.timestamp).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      ))}
      <Stack direction="row">
        <Typography color="error">Current Bid:  </Typography> 
        <Typography>$ {auction?.currentPrice}</Typography>
      </Stack>

      <div ref={bottomRef} />

      {user?.role !== "admin" && (
        <Stack direction="row" spacing={1}>
          <TextField
            label="Place your bid"
            placeholder={placeholder}
            variant="outlined"
            size="small"
            type="number"
            disabled={disabled}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handlePlaceBid}
            disabled={
              disabled ||
              !bidAmount ||
              parseFloat(bidAmount) <= (auction?.currentPrice ?? 0)
            }
          >
            Bid
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

import { Box, Paper, Stack, Typography } from "@mui/material";
import { type Product } from "../interfaces/ProductInterface";
import { type Auction } from "../interfaces/AuctionInterface";
import { type Bid } from "../interfaces/BidInterface";

interface ProductDetailsProps {
  product?: Product;
  auction?: Auction;
  winnerBid?: Bid | null;
}

export const ProductDetails = ({
  product,
  auction,
  winnerBid,
}: ProductDetailsProps) => {
  if (!product || !auction) return <Typography>Loading product...</Typography>;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: "240px",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
        <Typography variant="h5">{product.title}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>
          <strong>Base Price:</strong> ${product.basePrice}
        </Typography>
        <Typography>
          <strong>Current Price:</strong> ${auction.currentPrice}
        </Typography>
        <Typography>
          <strong>Start:</strong> {new Date(auction.startTime).toLocaleString()}
        </Typography>
        <Typography>
          <strong>End:</strong> {new Date(auction.endTime).toLocaleString()}
        </Typography>
        {winnerBid && (
          <Box>
            <Typography variant="h6" color="success.main">
              Winner
            </Typography>
            <Typography>
              <strong>User ID:</strong> {winnerBid.user?.name}
            </Typography>
            <Typography>
              <strong>Amount:</strong> ${winnerBid.amount}
            </Typography>
            <Typography>
              <strong>Time:</strong>{" "}
              {new Date(winnerBid.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

import { Box, Paper, Stack, Typography } from "@mui/material";
import { type Product } from "../interfaces/ProductInterface";
import { type Auction } from "../interfaces/AuctionInterface";
import { type Bid } from "../interfaces/BidInterface";
import { useTranslation } from "react-i18next";

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

  const {t} = useTranslation()

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
          <strong>{t("productDetails.base")}:</strong> ${product.basePrice}
        </Typography>
        <Typography>
          <strong>{t("productDetails.current")}:</strong> ${auction.currentPrice}
        </Typography>
        <Typography>
          <strong>{t("productDetails.start")}:</strong> {new Date(auction.startTime).toLocaleString()}
        </Typography>
        <Typography>
          <strong>{t("productDetails.end")}:</strong> {new Date(auction.endTime).toLocaleString()}
        </Typography>
        {winnerBid && (
          <Box>
            <Typography variant="h6" color="success.main">
              {t("productDetails.winner")}
            </Typography>
            <Typography>
              <strong>{t("productDetails.user")} ID:</strong> {winnerBid.user?.name}
            </Typography>
            <Typography>
              <strong>{t("productDetails.amount")}:</strong> ${winnerBid.amount}
            </Typography>
            <Typography>
              <strong>{t("productDetails.time")}:</strong>{" "}
              {new Date(winnerBid.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

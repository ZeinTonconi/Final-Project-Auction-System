import { useParams } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";

import { useProductsStore } from "../store/useProductsStore";
import { useAuctionsStore } from "../store/useAuctionStore";
import { ProductDetails } from "../components/ProductDetails";
import { BidChat } from "../components/BidChat";

function ProductBidHistoryPage() {
  const { auctionId } = useParams<{ auctionId: string }>();

  const products = useProductsStore((s) => s.products);
  const { auctions, history } = useAuctionsStore((s) => s);

  const auction = auctions.find((a) => a.id === auctionId);
  const product = products.find((p) => p.id === auction?.product?.id);
  const bids = history.filter((bid) => bid.auction.id === auctionId);

  const winnerBid = bids.length > 0 ? bids[bids.length - 1] : null;

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        height: "80vh",
        width: "100%",
      }}
    >
      <Grid container spacing={3} sx={{ flexFlow: 1 }}>
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Paper
            sx={{
              p: 2,
              flex: 1,
              overflowY: "auto",
            }}
          >
            <ProductDetails
              product={product}
              auction={auction}
              winnerBid={winnerBid}
            />
          </Paper>
        </Grid>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Paper
            sx={{
              p: 2,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Bid History
            </Typography>
            <BidChat bids={bids} auction={auction} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductBidHistoryPage;

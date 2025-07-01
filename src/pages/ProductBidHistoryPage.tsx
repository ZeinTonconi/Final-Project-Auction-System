import { Container, Grid, Paper, Typography } from "@mui/material";

import { ProductDetails } from "../components/ProductDetails";
import { BidChat } from "../components/BidChat";
import { useProductBidHistory } from "../hooks/useProductBidHistory";
import { useTranslation } from "react-i18next";

function ProductBidHistoryPage() {
  const { product, auction, winnerBid, bids } = useProductBidHistory();

  const {t} = useTranslation()

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
              {t("productBidHistory.title")}
            </Typography>
            <BidChat bids={bids} auction={auction} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductBidHistoryPage;

import { Container, Grid } from "@mui/material";
import { AuctionCard } from "../components/AuctionCard";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useNavigate } from "react-router-dom";

function BidHistoryPage() {
  const auctions = useAuctionsStore((state) => state.auctions);
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {( 
          auctions.filter((auction) => new Date(auction.endTime).getTime() < Date.now())
        ).map((auction) => (
          <Grid size={{xs: 12, sm: 6, md: 4}} key={auction.id}>
            <AuctionCard
              auction={auction}
              showActions={false}
              showTimer={false}
              onClick={() => navigate(`/bid-history/${auction.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BidHistoryPage;

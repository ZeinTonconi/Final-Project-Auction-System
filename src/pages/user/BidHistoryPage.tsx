import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { BidHistoryTable } from "../../components/BidHistoryTable";
import { useUser } from "../../contexts/userContext";
import type { Bid } from "../../interfaces/HistoryInterface";
import { getBidsByUserService } from "../../services/bidService";

export default function BidHistoryPage() {
  const { user } = useUser();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  const getHistory = async () => {
    const history = await getBidsByUserService(user!.id!);
    setBids(history);
  };

  useEffect(() => {
    getHistory();
  }, [user]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">My Bid History</Typography>
      {/* {loading ? (
        <Box sx={{ mt: 2 }}>
          <Typography>Loading…</Typography>
        </Box>
      ) : bids.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Typography>You haven't placed any bids yet.</Typography>
        </Box>
      ) : (
    )} */}
      <BidHistoryTable bids={bids} />
    </Container>
  );
}

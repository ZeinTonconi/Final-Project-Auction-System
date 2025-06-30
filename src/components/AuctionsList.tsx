import { Grid } from "@mui/material";
import type { Auction } from "../interfaces/AuctionInterface";
import { AuctionCard } from "./AuctionCard";

interface AuctionListProps {
  auc: Auction;
  handleView: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const AuctionList = ({ auc, handleView, handleDelete, handleEdit }: AuctionListProps) => {
  const prod = auc.product;
  if (!prod) return null;
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={auc.id}>
      <AuctionCard
        auction={auc}
        product={prod}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Grid>
  );
};

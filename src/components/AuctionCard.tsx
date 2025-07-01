import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import type { Auction } from "../interfaces/AuctionInterface";
import { AuctionCardTimer } from "./AuctionCardTimer";
import { AuctionCardActions } from "./AuctionCardActions";
import { useTranslation } from "react-i18next";

interface AuctionCardProps {
  auction: Auction;
  onView?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
  showTimer?: boolean;
  onClick?: () => void;
}

export const AuctionCard = ({
  auction,
  onView,
  onDelete,
  onEdit,
  showActions = true,
  showTimer = true,
  onClick,
}: AuctionCardProps) => {
  const now = Date.now();
  const start = new Date(auction.startTime).getTime();
  const end = new Date(auction.endTime).getTime();
  const isPast = end < now;
  const isUpcoming = start > now;
  const isActive = !isPast && !isUpcoming;

  const { product } = auction;
  const { t } = useTranslation();

  const statusLabel = isPast
    ? `${t("auctionCard.auctionEnd")}    `
    : isUpcoming
    ? t("auctionCard.auctionSealed")
    : `${t("auctionCard.auctionCurrent")}: $${auction.currentPrice.toFixed(2)}`;

  return (
    <Card sx={{ position: "relative", boxShadow: 3 }} onClick={onClick}>
      {showActions && (
        <AuctionCardActions
          isActive={isActive}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      <CardMedia
        component="img"
        height="200"
        image={product!.image}
        alt={product!.title}
      />

      {showTimer && (isActive || isUpcoming) && (
        <AuctionCardTimer endTime={end} />
      )}

      <CardContent sx={{ pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {product!.title}
        </Typography>

        <Box>
          {isPast ? (
            <>
              <Typography variant="body2" color="text.secondary">
                {statusLabel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("auctionCard.price")}: {auction.currentPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("auctionCard.start")}: {new Date(auction.startTime).toDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("auctionCard.end")}: {new Date(auction.endTime).toDateString()}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {statusLabel}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

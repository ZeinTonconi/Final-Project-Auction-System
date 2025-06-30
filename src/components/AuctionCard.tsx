import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GavelIcon from "@mui/icons-material/Gavel";
import type { Auction } from "../interfaces/AuctionInterface.ts";
import type { Product } from "../interfaces/ProductInterface.ts";
import { CountdownTimer } from "./CountdownTimer.tsx";
import { useUser } from "../contexts/userContext.tsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from '@mui/icons-material/Settings';
interface AuctionCardProps {
  auction: Auction;
  product: Product;
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const AuctionCard = ({
  auction,
  product,
  onView,
  onDelete,
  onEdit,
}: AuctionCardProps) => {
  const now = Date.now();
  const start = new Date(auction.startTime).getTime();
  const end = new Date(auction.endTime).getTime();
  const isPast = end < now;
  const isUpcoming = start > now;
  const isActive = !isPast && !isUpcoming;

  const { user } = useUser();

  const statusLabel = isPast
    ? "Auction Ended"
    : isUpcoming
    ? "Sealed Bid Auction"
    : `Current Bid: $${auction.currentPrice.toFixed(2)}`;

  const actions = [
    {
      name: "View",
      icon: <VisibilityIcon />,
      action: onView,
    },
    {
      name: "Edit",
      icon: <EditIcon />,
      action: onEdit,
    },
    {
      name: "Delete",
      icon: <DeleteIcon />,
      action: onDelete,
    },
  ];

  return (
    <Card
      sx={{
        position: "relative",
        boxShadow: 3,
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        {user!.role === "admin" ? (
          <SpeedDial
            ariaLabel="Actions"
            direction="down"
            icon={<SpeedDialIcon icon={<SettingsIcon/>} />}
            FabProps={{
              size: "small",
              sx: {
                width: 32,
                height: 32,
                minHeight: 32,
                boxShadow: "none",
              },
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
                FabProps={{
                  size: "small",
                  sx: {
                    width: 28,
                    height: 28,
                    minHeight: 28,
                  },
                }}
              />
            ))}
          </SpeedDial>
        ) : (
          <IconButton
            color="primary"
            onClick={onView}
            size="small"
            sx={{ backgroundColor: "white", mr: 1 }}
          >
            {isActive ? <GavelIcon /> : <VisibilityIcon />}
          </IconButton>
        )}
      </Box>

      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />

      {(isActive || isUpcoming) && <CountdownTimer endTime={end} />}

      <CardContent sx={{ pt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {statusLabel}
        </Typography>
      </CardContent>
    </Card>
  );
};

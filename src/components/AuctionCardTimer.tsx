import { CountdownTimer } from "./CountdownTimer";
import { Box } from "@mui/material";

interface AuctionCardTimerProps {
    endTime: number;
}

export const AuctionCardTimer = ({ endTime }: AuctionCardTimerProps) => (
    <Box>
        <CountdownTimer endTime={endTime} />
    </Box>
);

// src/components/CountdownTimer.tsx
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface CountdownTimerProps {
    endTime: number;
}

export const CountdownTimer = ({ endTime }: CountdownTimerProps) => {

    const calcRemaining = () => {
        const total = endTime - Date.now();
        const secs = Math.max(0, Math.floor(total / 1000));
        return {
            days: Math.floor(secs / 86400),
            hours: Math.floor((secs % 86400) / 3600),
            minutes: Math.floor((secs % 3600) / 60),
            seconds: secs % 60,
        };
    };

    const [time, setTime] = useState(calcRemaining());
    useEffect(() => {
        const iv = setInterval(() => setTime(calcRemaining()), 1000);
        return () => clearInterval(iv);
    }, []);

    return (
        <Box
            sx={{
                p: 1,
                backgroundColor: "rgba(255,255,255,0.9)",
                boxShadow: 1,
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-around",
                mt: -2,
                maxWidth: 300,
                mx: "auto",
            }}
        >
            {["days", "hours", "minutes", "seconds"].map((k) => (
                <Box key={k} sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{(time as any)[k]}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {k.charAt(0).toUpperCase() + k.slice(1)}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

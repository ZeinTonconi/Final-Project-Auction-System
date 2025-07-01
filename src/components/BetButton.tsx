// src/components/CrashTest.tsx

import { useState } from "react";
import { Button, Typography, Stack, Tooltip, Fab } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import GavelIcon from "@mui/icons-material/Gavel";

export const BetButton = () => {
   const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("Smuggling error triggered for testing the ErrorBoundary");
  }

  return (
    <Tooltip title="Smuggle an Error" placement="left">
      <Fab
        color="warning"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 4,
        }}
        onClick={() => setCrash(true)}
      >
        <ReportGmailerrorredIcon />
      </Fab>
    </Tooltip>
  );
};

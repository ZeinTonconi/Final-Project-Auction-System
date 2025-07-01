// src/components/CrashTest.tsx

import { useState } from "react";
import { Tooltip, Fab } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

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

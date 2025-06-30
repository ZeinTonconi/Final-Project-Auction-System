import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Bid } from "../interfaces/BidInterface";

interface BidHistoryTableProps {
  bids: Bid[];
}

export const BidHistoryTable = ({ bids }: BidHistoryTableProps) => {

    console.log(bids[0])
  const columns: GridColDef<Bid>[] = [
    { field: "id", headerName: "Bid ID", width: 90 },

    {
      field: "auction",
      headerName: "Auction ID",
      width: 120,
      renderCell: (params) => (
        `${params.value.id}`
      )
    },

    {
      field: "amount",
      headerName: "Your Bid",
      width: 120,
      renderCell: (params) =>
        `$${(params.value ?? 0).toFixed(2)}`,
    },

    {
      field: "timestamp",
      headerName: "When",
      flex: 1,
      renderCell: (params) => (
        `${new Date(params.value).toDateString()}`
      )
    },

    {
      field: "result",
      headerName: "Result",
      width: 140,
      renderCell: (params: GridRenderCellParams<any, Bid>) => {
        const bid = params.row;
        const auc = bid.auction!;
        const won =
          !auc.isActive &&
          auc.userId === bid.userId &&
          bid.amount === auc.currentPrice;

        if (auc.isActive) {
          return <Typography>Pending</Typography>;
        }
        return (
          <Typography
            color={won ? "success.main" : "text.secondary"}
            fontWeight={won ? "bold" : "normal"}
          >
            {won ? "Won" : "Lost"}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <DataGrid<Bid>
        rows={bids}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        autoHeight
        disableColumnMenu
        density="compact"
      />
    </Box>
  );
};

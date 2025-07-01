import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Bid } from "../interfaces/BidInterface";
import { useTranslation } from "react-i18next";

interface BidHistoryTableProps {
  bids: Bid[];
}

export const BidHistoryTable = ({ bids }: BidHistoryTableProps) => {

  const {t} = useTranslation();

  const columns: GridColDef<Bid>[] = [
    { field: "id", headerName: `${t("bidTable.bid")} ID` , width: 90 },

    {
      field: "auction",
      headerName: `${t("bidTable.auction")} ID`,
      width: 120,
      renderCell: (params) => (
        `${params.value.id}`
      )
    },

    {
      field: "amount",
      headerName: `Your ${t("bidTable.bid")}`,
      width: 120,
      renderCell: (params) =>
        `$${(params.value ?? 0).toFixed(2)}`,
    },

    {
      field: "timestamp",
      headerName: t("bidTable.when"),
      flex: 1,
      renderCell: (params) => (
        `${new Date(params.value).toDateString()}`
      )
    },

    {
      field: "result",
      headerName: t("bidTable.result"),
      width: 140,
      renderCell: (params: GridRenderCellParams<any, Bid>) => {
        const bid = params.row;
        const auc = bid.auction!;
        const won =
          !auc.isActive &&
          auc.userId === bid.userId &&
          bid.amount === auc.currentPrice;

        if (auc.isActive) {
          return <Typography>${t("bidTable.peding")}</Typography>;
        }
        return (
          <Typography
            color={won ? "success.main" : "text.secondary"}
            fontWeight={won ? "bold" : "normal"}
          >
            {won ? t("bidTable.won") : t("bidTable.lost")}
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

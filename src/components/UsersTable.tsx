import { Box, Avatar, Tooltip, IconButton, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "../interfaces/UserInterface";

interface UsersTableProps {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            src={params.value as string}
            alt={params.row.username}
            sx={{ width: 50, height: 50 }}
          >
            {params.row.username[0].toUpperCase()}
          </Avatar>
        </Box>
      ),
      align: "center",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 0.4,
      align: "center",
      renderCell: (params) => (
        <Typography fontWeight={500}>{params.value}</Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.3,
      align: "center",
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value === "admin" ? "primary.main" : "text.secondary",
            fontWeight: 500,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="info" onClick={() => onEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
      <Box sx={{ minWidth: { xs: "100%", sm: 500 } }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id!}
          disableColumnMenu
          density="compact"
          rowHeight={100}
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center", 
              justifyContent: "center", 
              padding: "0 8px", 
            },
          }}
        />
      </Box>
    </Box>
  );
};

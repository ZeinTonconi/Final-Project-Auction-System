import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useUser } from "../contexts/userContext.tsx";
import { FormDialog } from "../components/FormDialog.tsx";
import { useDashboard } from "../hooks/useDashboard.ts";
import { AuctionList } from "../components/AuctionsList.tsx";
import { ViewAuctionDialog } from "../components/ViewAuctionDialog.tsx";
import { useAuctionSSE } from "../hooks/useAuctionSSE.ts";

export default function AuctionDashboardPage() {
  const { user } = useUser();
  useAuctionSSE();
  const {
    setOpenFormAuction,
    auctions,
    handleClose,
    handleView,
    handleDelete,
    handleEdit,
    openFormAuction,
    formik,
    products,
    openViewAuction,
    selectedAuction,
  } = useDashboard();

  return (
    <Container sx={{ py: 4 }}>
      {user?.role === "admin" && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={4}
        >
          <Typography variant="h4">Auctions Dashboard</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              setOpenFormAuction(true);
            }}
          >
            Add Auction
          </Button>
        </Stack>
      )}
      <Stack spacing={3}>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Typography variant="h4" gutterBottom>
            LATEST AUCTIONS
          </Typography>
        </Box>
        <Divider variant="middle" />

        <Grid container spacing={3}>
          {auctions
            .filter(
              (auc) =>
                new Date(auc.startTime).getTime() <= Date.now() &&
                Date.now() <= new Date(auc.endTime).getTime()
            )
            .map((auc) => (
              <AuctionList
                auc={auc}
                handleView={() => handleView(auc)}
                handleEdit={() => handleEdit(auc)}
                handleDelete={() => handleDelete(auc)}
              />
            ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Typography variant="h4" gutterBottom>
            UPCOMING AUCTIONS
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={3}>
          {auctions
            .filter((auc) => Date.now() < new Date(auc.startTime).getTime())
            .map((auc) => (
              <AuctionList
                auc={auc}
                handleView={() => handleView(auc)}
                handleEdit={() => handleEdit(auc)}
                handleDelete={() => handleDelete(auc)}
              />
            ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            position: "relative",
          }}
        >
          <Typography variant="h4" gutterBottom>
            PAST AUCTIONS
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={3}>
          {auctions
            .filter((auc) => Date.now() > new Date(auc.endTime).getTime())
            .map((auc) => (
              <AuctionList
                auc={auc}
                handleView={() => handleView(auc)}
                handleEdit={() => handleEdit(auc)}
                handleDelete={() => handleDelete(auc)}
              />
            ))}
        </Grid>
      </Stack>

      <FormDialog
        open={openFormAuction}
        onClose={handleClose}
        onSubmit={formik.handleSubmit}
        title="Create an Auction"
      >
        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ sm: 6, xs: 12 }}>
            <Stack spacing={5}>
              <Autocomplete
                autoHighlight
                options={products}
                getOptionLabel={(p) => p?.title ?? ""}
                value={formik.values.product}
                onChange={(_, p) => formik.setFieldValue("product", p)}
                renderOption={(props, p) => (
                  <li {...props} key={p.id}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    {p.title} — ${p.basePrice}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Product"
                    error={!!formik.errors.product && formik.touched.product}
                    helperText={
                      formik.touched.product &&
                      (formik.errors.product as string)
                    }
                    placeholder="Select Product"
                  />
                )}
              />

              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="startTime"
                value={formik.values.startTime}
                onChange={formik.handleChange}
                error={formik.touched.startTime && !!formik.errors.startTime}
                helperText={formik.touched.startTime && formik.errors.startTime}
              />

              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                error={formik.touched.endTime && !!formik.errors.endTime}
                helperText={formik.touched.endTime && formik.errors.endTime}
              />
            </Stack>
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            {/* TODO AGREGAR CARD PREVIEW */}
            {/* {formik.errors && <AuctionCard
                  auction={
                    
                    productId: string;
        startTime: string;
    endTime: string;
    currentPrice: number;
    isActive: boolean;
    product?: Product

                  }
                  
                />} */}
          </Grid>
        </Grid>
      </FormDialog>
      {selectedAuction && <ViewAuctionDialog
        open={openViewAuction}
        handleClose={handleClose}
        auction={selectedAuction!}
      />}
    </Container>
  );
}

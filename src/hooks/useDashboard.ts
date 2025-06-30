import { useEffect, useState } from "react";
import * as Yup from 'yup';
import type { Auction } from "../interfaces/AuctionInterface";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useProductsStore } from "../store/useProductsStore";
import { useFormik } from "formik";
import type { Product } from "../interfaces/ProductInterface";


export const useDashboard = () => {
  const [openFormAuction, setOpenFormAuction] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<null | Auction> (null);
  const [openViewAuction, setOpenViewAuction] = useState(false)

  const { auctions, getAuctions, createAuction, deleteAuction, updateAuction } =
    useAuctionsStore((state) => state);

  const { products, getProducts } = useProductsStore((state) => state);

  useEffect(() => {
    getProducts();
    getAuctions();
  }, []);

  function toDateTimeLocal(isoString: string) {
    const d = new Date(isoString);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  const handleView = (a: Auction) => {
    setSelectedAuction(a);
    setOpenViewAuction(true)
  };
  const handleEdit = (a: Auction) => {
    setSelectedAuction(a);
    formik.setValues({
      ...a,
      product: a.product!,
      startTime: toDateTimeLocal(a.startTime),
      endTime: toDateTimeLocal(a.endTime),
    });
    setOpenFormAuction(true);
  };

  const handleDelete = (a: Auction) => {
    deleteAuction(a);
  };

  const handleClose = () => {
    formik.resetForm();
    setSelectedAuction(null);
    setOpenFormAuction(false);
    setOpenViewAuction(false)
  };

  const auctionSchema = Yup.object({
    product: Yup.object().nullable().required("Please select a product"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string()
      .required("End time is required")
      .test(
        "is-after-start",
        "End time must be later than start time",
        function (endVal) {
          const { startTime } = this.parent as { startTime: string };
          if (!startTime || !endVal) return true;
          return new Date(endVal) > new Date(startTime);
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      product: null as Product | null,
      startTime: "",
      endTime: "",
    },
    validationSchema: auctionSchema,
    onSubmit: async (values) => {
      const newAuction: Auction = {
        productId: values.product!.id!,
        startTime: new Date(values.startTime).toISOString(),
        endTime: new Date(values.endTime).toISOString(),
        currentPrice: values.product!.basePrice,
        isActive: false,
        product: values.product!,
      };

      if (selectedAuction)
        updateAuction({
          ...selectedAuction,
          ...newAuction,
        });
      else 
        createAuction(newAuction);

      handleClose();
    },
  });

  return {
    setOpenFormAuction,
    auctions,
    handleClose,
    handleView,
    handleEdit,
    handleDelete,
    openFormAuction,
    formik,
    products,
    openViewAuction,
    selectedAuction
  }
};

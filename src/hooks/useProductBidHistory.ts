import { useParams } from "react-router-dom";
import { useProductsStore } from "../store/useProductsStore";
import { useAuctionsStore } from "../store/useAuctionStore";
import { useMemo } from "react";

export const useProductBidHistory = () => {
  const { auctionId } = useParams<{ auctionId: string }>();

  const products = useProductsStore((s) => s.products);
  const { auctions, history } = useAuctionsStore((s) => s);

  const auction = useMemo(
    () => auctions.find((a) => a.id === auctionId),
    [auctions, auctionId]
  );

  const product = useMemo(
    () => products.find((p) => p.id === auction?.product?.id),
    [products, auction?.product?.id]
  );

  const bids = useMemo(
    () => history.filter((bid) => bid.auction.id === auctionId),
    [history, auctionId]
  );

  const winnerBid = bids.length > 0 ? bids[bids.length - 1] : null;

  return {
    product,
    winnerBid,
    auction,
    bids,
  };
};

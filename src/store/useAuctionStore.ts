import { create } from "zustand";
import type { Auction } from "../interfaces/AuctionInterface";
import {
  createAuctionService,
  deleteAuctionService,
  getAuctionsWithProduct,
  updateAuctionService,
  updateBidService,
} from "../services/auctionService";
import type { Bid } from "../interfaces/HistoryInterface";

interface AuctionsStore {
  auctions: Auction[];
  history: Bid[];

  getAuctions: () => void;
  createAuction: (auction: Auction) => void;
  updateAuction: (auction: Auction) => void;
  deleteAuction: (auction: Auction) => void;
  updateBid: (
    auction: Auction,
    newBid: number,
    newWinner: string,
    timestamp: string
  ) => void;
  makeBid: (
    auction: Auction,
    newBid: number,
    newWinner: string,
    timestamp: string
  ) => void;
}

export const useAuctionsStore = create<AuctionsStore>((set) => ({
  auctions: [],
  history: [],
  getAuctions: async () => {
    try {
      const res = await getAuctionsWithProduct();
      set({ auctions: res });
    } catch (error) {
      console.error(error);
    }
  },
  createAuction: async (auction: Auction) => {
    try {
      const { product } = auction;
      delete auction.product;
      const res = await createAuctionService(auction);

      const newAuction = {
        ...res,
        product,
      };

      set((prev) => ({
        auctions: [...prev.auctions, newAuction],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateAuction: async (auction: Auction) => {
    try {
      const { product } = auction;
      delete auction.product;
      const res = await updateAuctionService(auction);

      const newAuction = {
        ...res,
        product,
      };

      set((prev) => ({
        auctions: prev.auctions.map((auct: Auction) =>
          auct.id === newAuction.id ? newAuction : auct
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteAuction: async (auction: Auction) => {
    try {
      const { id } = auction;
      await deleteAuctionService(id!);
      set((prev) => ({
        auctions: prev.auctions.filter((auct) => auct.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateBid: async (
    auction: Auction,
    newBid: number,
    newWinner: string,
    timestamp: string
  ) => {
    try {
      const newAuction = {
        ...auction,
        currentPrice: newBid,
        userId: newWinner,
        lastBid: timestamp,
      };

      set((prev) => ({
        auctions: prev.auctions.map((auct: Auction) =>
          auct.id === newAuction.id ? newAuction : auct
        ),
        // history: [...prev.history, {
        //     auctionId: newAuction.id,
        //     bid: newBid,
        //     bidderId: newWinner,
        //     time: timestamp
        // }]
      }));
    } catch (error) {
      console.error(error);
    }
  },
  makeBid: async (
    auction: Auction,
    newBid: number,
    newWinner: string,
    timestamp: string
  ) => {
    try {
      const newAuction = {
        ...auction,
        currentPrice: newBid,
        userId: newWinner,
        lastBid: timestamp,
      };

      await updateBidService(newAuction);

      set((prev) => ({
        auctions: prev.auctions.map((auct: Auction) =>
          auct.id === newAuction.id ? newAuction : auct
        ),
        // history: [...prev.history, {
        //     auctionId: newAuction.id,
        //     bid: newBid,
        //     bidderId: newWinner,
        //     time: timestamp
        // }]
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

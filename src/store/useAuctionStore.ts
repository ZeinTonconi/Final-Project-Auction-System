import { create } from "zustand";
import type { Auction } from "../interfaces/AuctionInterface";
import {
  createAuctionService,
  deleteAuctionService,
  getAuctionsById,
  getAuctionsService,
  getAuctionsWithProduct,
  updateAuctionService,
  updateBidService,
} from "../services/auctionService";
import type { Bid } from "../interfaces/BidInterface";
import { getHistoryService } from "../services/bidService";
import type { User } from "../interfaces/UserInterface";
import { getUserByIdService } from "../services/userService";

interface AuctionsStore {
  auctions: Auction[];
  history: Bid[];

  getAuctions: () => void;
  createAuction: (auction: Auction) => void;
  updateAuction: (auction: Auction) => void;
  deleteAuction: (auction: Auction) => void;
  updateBid: (
    auctinId: string,
    newBid: number,
    newWinner: string,
    timestamp: string
  ) => void;
  makeBid: (
    auction: Auction,
    newBid: number,
    newWinner: string,
    timestamp: string,
    user: User
  ) => void;
}

export const useAuctionsStore = create<AuctionsStore>((set) => ({
  auctions: [],
  history: [],
  getAuctions: async () => {
    try {
      const res = await getAuctionsWithProduct();

      const hist = await getHistoryService();

      set({ auctions: res, history: hist });
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
    auctionId: string,
    newBid: number,
    newWinner: string,
    timestamp: string,
  ) => {
    try {
      const auction = await getAuctionsById(auctionId)
      const user = await getUserByIdService(newWinner)

      const newAuction: Auction = {
        ...auction,
        currentPrice: newBid
      };

      const bid: Bid = {
       amount: newBid,
       auction: auction,
       auctionId: auctionId,
       timestamp: timestamp,
       userId: newWinner,
       user: user 
      }

      set((prev) => ({
        auctions: prev.auctions.map((auct: Auction) =>
          auct.id === newAuction.id ? newAuction : auct
        ),
        history: [...prev.history, bid]

      }));
    } catch (error) {
      console.error(error);
    }
  },
  makeBid: async (
    auction: Auction,
    newAmount: number,
    newWinner: string,
    timestamp: string,
    user: User
  ) => {
    try {
      const newAuction = {
        ...auction,
        currentPrice: newAmount,
        userId: newWinner,
        lastBid: timestamp,
      };

      const newBid: Bid = await updateBidService(newAuction, user);

      // const bid: Bid = {
      //   ...newBid,
      //   auction,
      //   user
      // }
      

      // set((prev) => ({
      //   auctions: prev.auctions.map((auct: Auction) =>
      //     auct.id === newAuction.id ? newAuction : auct
      //   ),
      //   history: [...prev.history, bid]
      // }));
    } catch (error) {
      console.error(error);
    }
  },
}));

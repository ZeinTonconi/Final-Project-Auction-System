import jsonServerInstance from "../api/jsonServerInstance";
import type { Auction } from "../interfaces/AuctionInterface";
import type { Bid } from "../interfaces/BidInterface";
import type { User } from "../interfaces/UserInterface";
import { getAuctionsService } from "./auctionService";
import { getUsersService } from "./userService";

const BIDS_URL = "bids";

export const getHistoryService = async () => {
  try {
    const res = await jsonServerInstance.get(`${BIDS_URL}`);

    const auctions = await getAuctionsService();

    const users = await getUsersService();

    const bids = res.data.map((bid: Bid) => {
      const user = users.find((user: User) => user.id === bid.userId);
      const auction = auctions.find((auct: Auction) => auct.id === bid.auctionId)
      return {
        ...bid,
        user,
        auction
      };
    });
    return bids;
  } catch (error) {
    console.error("Error getting bids: ", error);
    throw error;
  }
};

export const getBidsByUserService = async (userId: string) => {
  try {
    const res = await jsonServerInstance.get(`${BIDS_URL}?userId=${userId}`);

    const users = await getUsersService();
    const user = users.find((u: User) => u.id === userId);

    const bids = res.data.map((bid: Bid) => ({
      ...bid,
      user,
    }));

    return bids;
  } catch (error) {
    console.error("Error getting bids for the current user:", error);
    throw error;
  }
};

export const getBidsByProductService = async (productId: string) => {
  try {
    const users = await getUsersService();

    const res = await jsonServerInstance.get(
      `${BIDS_URL}?auction.productId=${productId}`
    );

    const bids = res.data.map((bid: Bid) => {
      const user = users.find((user: User) => user.id === bid.userId);
      return {
        ...bid,
        user,
      };
    });
    return bids;
  } catch (error) {
    console.error("Error getting bids for the current product:", error);
    throw error;
  }
};

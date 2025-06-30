import jsonServerInstance from "../api/jsonServerInstance.ts";
import type { Auction } from "../interfaces/AuctionInterface.ts";
import type { Product } from "../interfaces/ProductInterface.ts";
import { getProductsService } from "./productService.ts";

const AUCTION_URL = "auctions";

export const getAuctionsService = async () => {
  try {
    const res = await jsonServerInstance.get(AUCTION_URL);
    return res.data;
  } catch (error) {
    console.error("Error getting auctions:", error);
    throw error;
  }
};

export const getAuctionsWithProduct = async () => {
  try {
    const auctions = await getAuctionsService();
    const products = await getProductsService();
    return auctions.map((auction: Auction) => {
      const product = products.find((p: Product) => p.id === auction.productId);
      return {
        ...auction,
        product,
      };
    });
  } catch (error) {
    console.error("Error getting auctions with product:", error);
    throw error;
  }
};

export const createAuctionService = async (auction: Auction) => {
  try {
    const res = await jsonServerInstance.post(AUCTION_URL, auction);
    return res.data;
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
};

export const updateAuctionService = async (auction: Auction) => {
  try {
    const res = await jsonServerInstance.put(
      `${AUCTION_URL}/${auction.id}`,
      auction
    );
    return res.data;
  } catch (error) {
    console.error("Error updating auction:", error);
    throw error;
  }
};

export const deleteAuctionService = async (id: string) => {
  try {
    const res = await jsonServerInstance.delete(`${AUCTION_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting auction:", error);
    throw error;
  }
};

export const updateBidService = async (auction: Auction) => {
  try {
    const res = await updateAuctionService(auction);
    await jsonServerInstance.post("bids", {
      auction,
      amount: res.currentPrice,
      userId: res.userId,
      timestamp: new Date(Date.now()).toISOString(),
    });
    return res
  } catch (error) {
    console.error(error)

  }
};

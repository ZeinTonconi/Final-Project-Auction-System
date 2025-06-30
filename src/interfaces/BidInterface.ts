
export interface AuctionSummary {
  id: string;
  productId: string;
  startTime: string;
  endTime: string;
  currentPrice: number;
  isActive: boolean;
  userId: string;
  lastBid: string;
}

export interface Bid {
  id: number;
  amount: number;
  userId: string;
  timestamp: string;
  auction: AuctionSummary;
}

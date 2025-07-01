import type { Auction } from "./AuctionInterface";
import type { User } from "./UserInterface";


export interface Bid {
  id?: number;
  amount: number;
  userId: string;
  auctionId: string
  timestamp: string;
  auction: Auction;
  user?: User
}

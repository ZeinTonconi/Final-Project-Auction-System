import type {Product} from "./ProductInterface.ts";

export interface Auction {
    id?: string;
    productId: string;
    startTime: string;
    endTime: string;
    currentPrice: number;
    isActive: boolean;
    product?: Product
}

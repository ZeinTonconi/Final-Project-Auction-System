import { useEffect } from "react";
import { useAuctionsStore } from "../store/useAuctionStore";

export function useAuctionSSE() {
  const updateBid = useAuctionsStore((state) => state.updateBid);

  useEffect(() => {
    const es = new EventSource("http://localhost:3000/events");

    es.onmessage = (event) => {
      console.log("Recieved Bid")
      try {
        const parsed = JSON.parse(event.data);
        console.log("Bid parsed", parsed)
        if (parsed.type === "new_bid") {
          const bid = parsed.bid;

          updateBid(bid.auctionId, bid.amount, bid.userId, bid.timestamp);
        }
      } catch (err) {
        console.error("Failed to parse SSE", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error:", err);
      es.close();
    };

    return () => {
      es.close();
    };
  }, [updateBid]);
}

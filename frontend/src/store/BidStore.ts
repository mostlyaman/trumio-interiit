import { create } from "zustand";

export interface Milestone {
  name?: string | undefined;
  description?: string;
  duration?: number;
  cost?: number;
  deliverables?: string;
}
export interface BidData {
  milestones: Milestone[];
  start_date: Date;
}
interface Bid {
  bid_data: BidData;
}
interface BidStoreProps {
  bid: Bid;
  setBid: (bid: Bid) => void;
  resetBid: () => void;
}

export const useBidStore = create<BidStoreProps>()((set) => ({
  bid: {
    bid_data: {
      start_date: new Date(),
      milestones: [
        {
          name: "MileStone 1",
          description: "",
          duration: 0,
          cost: 0,
          deliverables: "Deliverable 1",
        },
      ],
    },
  },
  setBid: (bid: Bid) => {
    set({ bid });
  },
  resetBid: () => {
    set({
      bid: {
        bid_data: {
          start_date: new Date(),
          milestones: [
            {
              name: "MileStone 1",
              description: "",
              duration: 0,
              cost: 0,
              deliverables: "Deliverable 1",
            },
          ],
        },
      },
    });
  },
}));

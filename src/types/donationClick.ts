export interface DonationClickSummary {
  totalClicks: number;
  uniqueOrders: number;
  clickedAmountSum: number;
  averageAmount: number;
  ordersInRange: number;
  clickRatePerOrder: number;
  depositedClicks: number;
  depositedOrders: number;
  depositAmountSum: number;
  depositRatePerOrder: number;
}

export interface DonationClickDailyPoint {
  date: string;
  clicks: number;
  uniqueOrders: number;
  amountSum: number;
  depositAmountSum: number;
}

export interface DonationClickBucket {
  key: string | null;
  clicks: number;
  ratio: number;
}

export interface DonationClickWorkspaceItem {
  workspaceId: number;
  workspaceName: string | null;
  clicks: number;
  uniqueOrders: number;
  amountSum: number;
  depositAmountSum: number;
}

export interface CustomerDonationClickStats {
  startDate: string;
  endDate: string;
  summary: DonationClickSummary;
  daily: DonationClickDailyPoint[];
  byAmount: DonationClickBucket[];
  byMethod: DonationClickBucket[];
  byNoteIndex: DonationClickBucket[];
  topWorkspaces: DonationClickWorkspaceItem[];
}

export interface DonationClickItem {
  id: number;
  createdAt: string | null;
  orderId: number | null;
  workspaceId: number | null;
  workspaceName: string | null;
  method: string | null;
  amount: number | null;
  depositAmount: number | null;
  depositConfirmedAt: string | null;
  depositMemo: string | null;
}

export interface DonationClickSummary {
  totalClicks: number;
  uniqueOrders: number;
  clickedAmountSum: number;
  averageAmount: number;
  ordersInRange: number;
  clickRatePerOrder: number;
}

export interface DonationClickDailyPoint {
  date: string;
  clicks: number;
  uniqueOrders: number;
  amountSum: number;
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
}

export interface CustomerDonationClickStats {
  startDate: string;
  endDate: string;
  summary: DonationClickSummary;
  daily: DonationClickDailyPoint[];
  byAmount: DonationClickBucket[];
  byMethod: DonationClickBucket[];
  byVariant: DonationClickBucket[];
  byNoteIndex: DonationClickBucket[];
  topWorkspaces: DonationClickWorkspaceItem[];
}

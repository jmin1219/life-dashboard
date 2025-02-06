export interface InvestmentType {
  id: number;
  accountId: number;
  assetName: string;
  assetType: string;
  shares: number;
  pricePerShare: number;
  totalValue: number;
  datePurchased: number;
}

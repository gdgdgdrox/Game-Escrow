export interface GameRequestDTO {
  gameID: number;
  gameName: string;
  gameImagePath: string;
  assetType: string;
  assetName?: string;
  assetQuantity?: string;
}

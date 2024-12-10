import { GameAssetResponseDTO } from "./game-asset-response.dto";

export interface GameResponseDTO{
    gameID: number,
    gameName: string,
    gameImagePath: string,
    gameAssets: GameAssetResponseDTO[]
}

import { GameAssetResponseDTO } from "./game-asset-response.dto";

export interface GameResponseDTO{
    gameID: number,
    gameName: string,
    gameAssets: GameAssetResponseDTO[]
}
import { GameAsset } from "./game.asset";

export interface Game{
    id: number,
    name: string,
    assets: GameAsset[]
}

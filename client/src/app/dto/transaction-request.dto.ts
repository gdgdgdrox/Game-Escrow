import { GameRequestDTO } from "./game-request.dto"

export interface TransactionRequestDTO{
    // transactionID?: string,
    buyer: string,
    seller: string,
    counterparty: string,
    game: GameRequestDTO
    price: number

}
import { TransactionSteps } from "./transaction-step";

export interface TransactionResponseDTO{
    transactionID: string,
    buyer: string,
    seller: string,
    counterparty: string,
    price: number,
    currentStep: number,
    game: TransactionGameResponseDTO,
    transactionSteps: TransactionSteps   
}

export interface TransactionGameResponseDTO{
    gameID: number,
    gameName: string,
    assetType: string,
    assetName?: string,
    assetQuantity?: string
}
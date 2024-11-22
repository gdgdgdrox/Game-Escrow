export interface Transaction{
    transactionID?: string,
    buyer: string,
    seller: string,
    counterparty: string,
    game: {
        id: number,
        assetType: string,
        name?: string,
        quantity?: string,
    },
    price: number

}
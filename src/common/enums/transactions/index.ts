
export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER",
    BUY = "BUY",
    SELL = "SELL",
    //FEE = "FEE"
}

export enum TransactionStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}

export enum PaymentMethod {
    BANK_TRANSFER = "BANK_TRANSFER",
    CARD = "CARD",
    CASH = "CASH",
    MOBILE_MONEY = "MOBILE_MONEY"
}
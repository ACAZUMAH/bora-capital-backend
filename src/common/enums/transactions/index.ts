
export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER",
    BUY = "BUY",
    SELL = "SELL",
    FEE = "FEE"
}

export enum TransactionStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
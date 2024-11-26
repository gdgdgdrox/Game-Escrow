export interface BaseTransactionStep {
    createdDate: string;
    completedDate: string;
    status: string;
  }

export interface TransactionStep1 extends BaseTransactionStep {}

export interface TransactionStep2 extends BaseTransactionStep {}

export interface TransactionStep3 extends BaseTransactionStep {}

export interface TransactionStep4 extends BaseTransactionStep {
  buyerConfirmed: boolean;
  sellerConfirmed: boolean;
}

export interface TransactionSteps {
    transactionStep1: TransactionStep1;
    transactionStep2: TransactionStep2;
    transactionStep3: TransactionStep3;
    transactionStep4: TransactionStep4;
  }
  
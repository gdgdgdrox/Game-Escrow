package com.escrowforgame.server.entity;

import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@Data
@DynamoDbBean
public class TransactionSteps {
    private TransactionStep1 transactionStep1;
    private TransactionStep2 transactionStep2;
    private TransactionStep3 transactionStep3;
    private TransactionStep4 transactionStep4;

    public TransactionSteps(){
        this.transactionStep1 = new TransactionStep1();
        this.transactionStep2 = new TransactionStep2();

    }
}

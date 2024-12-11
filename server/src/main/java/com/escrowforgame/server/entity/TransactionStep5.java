package com.escrowforgame.server.entity;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@Getter
@Setter
public class TransactionStep5 extends BaseTransactionStep {

    private boolean sellerDispute;

    public TransactionStep5() {
        this.setCreatedDate();
        this.setCompletedDate();
        this.setStatus("completed");
        this.setSellerDispute(false);
    }

    @Override
    public String toString() {
        return "TransactionStep5 [createdDate=" + getCreatedDate() + ", completedDate=" + getCompletedDate()
                + ", status=" + getStatus() + ", sellerDispute=" + isSellerDispute() + "].";
    }
}

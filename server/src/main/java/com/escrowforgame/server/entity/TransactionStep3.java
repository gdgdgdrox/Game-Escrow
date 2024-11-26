package com.escrowforgame.server.entity;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
public class TransactionStep3 extends BaseTransactionStep{
    public TransactionStep3(){
        this.setCreatedDate();
        this.setStatus("pending buyer payment");
    }

    @Override
	public String toString() {
		return "TransactionStep3 [createdDate=" + getCreatedDate() + ", completedDate=" + getCompletedDate() + ", status=" + getStatus()+ "].";
	}

}

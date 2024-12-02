package com.escrowforgame.server.entity;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
public class TransactionStep5 extends BaseTransactionStep{
    public TransactionStep5(){
        this.setCreatedDate();
        this.setStatus("completed");
    }

    @Override
	public String toString() {
		return "TransactionStep5 [createdDate=" + getCreatedDate() + ", completedDate=" + getCompletedDate() + ", status=" + getStatus()+ "].";
	}    
}

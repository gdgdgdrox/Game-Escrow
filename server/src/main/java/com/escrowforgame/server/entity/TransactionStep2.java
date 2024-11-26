package com.escrowforgame.server.entity;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@Getter
@Setter
public class TransactionStep2 extends BaseTransactionStep{
    public TransactionStep2(){
        setCreatedDate();
        setStatus("pending");
    }
    @Override
	public String toString() {
		return "TransactionStep2 [createdDate=" + getCreatedDate() + ", completedDate=" + getCompletedDate() + ", status=" + getStatus()+ "].";
	}

    public static void markStep2AsCompleted(){
        
    }
}

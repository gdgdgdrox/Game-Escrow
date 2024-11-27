package com.escrowforgame.server.entity;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@Getter
@Setter
public class TransactionStep4 extends BaseTransactionStep{

    public TransactionStep4(){
        this.setCreatedDate();
        this.setStatus("pending");
        this.setBuyerConfirmed(false);
        this.setSellerConfirmed(false);
    }
    private boolean buyerConfirmed;
    private boolean sellerConfirmed;

    @Override
	public String toString() {
		return "TransactionStep4 \n[createdDate=" + getCreatedDate() + ", \ncompletedDate=" + getCompletedDate() + ", \nstatus=" + getStatus()+ ", \nbuyerConfirmed= " + isBuyerConfirmed() + ", \nsellerConfirmed= " + isSellerConfirmed() + "].";
	}
}

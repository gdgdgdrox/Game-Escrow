package com.escrowforgame.server.entity;

import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@DynamoDbBean
@Getter
@Setter
public class TransactionStep4 extends BaseTransactionStep{
    private boolean buyerConfirmed;
    private boolean sellerConfirmed;
}

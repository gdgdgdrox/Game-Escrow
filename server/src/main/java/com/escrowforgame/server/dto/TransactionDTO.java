package com.escrowforgame.server.dto;

import lombok.Data;
import lombok.Getter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Data
public class TransactionDTO {
    private String transactionID;
    
    private String buyer;
    private String seller;
    private String counterparty;
    private Integer price;
    private TransactionGameDTO game;

}

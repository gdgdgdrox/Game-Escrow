package com.escrowforgame.server.dto;

import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@Data
@DynamoDbBean
public class TransactionGameDTO {
    private Integer gameID;
    private String gameName;
    private String assetType;
    private String assetName; // Optional field
    private String assetQuantity; // Optional field

}

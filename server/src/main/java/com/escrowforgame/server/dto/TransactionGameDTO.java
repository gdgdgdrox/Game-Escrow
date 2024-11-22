package com.escrowforgame.server.dto;

import lombok.Data;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;

@Data
@DynamoDbBean
public class TransactionGameDTO {
    private Integer id;
    private String assetType;
    private String name; // Optional field
    private String quantity; // Optional field

}

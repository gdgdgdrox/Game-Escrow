package com.escrowforgame.server.entity;

import java.util.UUID;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.dto.TransactionGameDTO;

import lombok.Data;
import lombok.Getter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;

@DynamoDbBean
@Data
public class TransactionEntity {
 @Getter(onMethod = @__({@DynamoDbPartitionKey}))
    private String transactionID;


    private String buyer;
    private String seller;

    @Getter(onMethod = @__({@DynamoDbSecondaryPartitionKey(indexNames="CounterpartyGSI")}))
    private String counterparty;
    private Integer price;
    private Integer currentStep;
    private TransactionGameDTO game;
    private TransactionSteps transactionSteps;

    public TransactionEntity(){
        String transactionID = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        this.setTransactionID(transactionID);
        this.setCurrentStep(2);
        this.transactionSteps = new TransactionSteps();
    }
    
    public void mapDTOtoEntity(TransactionDTO transactionDTO){
        this.setBuyer(transactionDTO.getBuyer());
        this.setSeller(transactionDTO.getSeller());
        this.setCounterparty(transactionDTO.getCounterparty());
        this.setPrice(transactionDTO.getPrice());
        this.setGame(transactionDTO.getGame());

    }

    public TransactionDTO mapEntityToDTO() {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setTransactionID(this.transactionID);
        transactionDTO.setBuyer(this.getBuyer());
        transactionDTO.setSeller(this.getSeller());
        transactionDTO.setCounterparty(this.getCounterparty());
        transactionDTO.setPrice(this.getPrice());
        transactionDTO.setGame(this.getGame());
        return transactionDTO;
    }
}

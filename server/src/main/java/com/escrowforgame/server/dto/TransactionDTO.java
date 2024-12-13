package com.escrowforgame.server.dto;

import com.escrowforgame.server.entity.TransactionEntity;

import lombok.Data;

@Data
public class TransactionDTO {
    private String transactionID;
    
    private String buyer;
    private String seller;
    private String counterparty;
    private Integer price;
    private TransactionGameDTO game;

    public TransactionEntity mapDTOtoEntity(){
        TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.setBuyer(this.getBuyer());
        transactionEntity.setSeller(this.getSeller());
        transactionEntity.setCounterparty(this.getCounterparty());
        transactionEntity.setPrice(this.getPrice());
        transactionEntity.setGame(this.getGame());
        return transactionEntity;

    }

}

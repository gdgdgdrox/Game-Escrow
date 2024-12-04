package com.escrowforgame.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.repository.TransactionRepository;

import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public TransactionEntity createTransaction(TransactionDTO transactionDTO) throws DynamoDbException {
        TransactionEntity transactionEntity = transactionDTO.mapDTOtoEntity();
        System.out.println("Created entity: " + transactionEntity.toString());
        transactionRepository.createTransaction(transactionEntity);
        return transactionEntity;
    }

    public List<TransactionEntity> getAllTransactionsByUser(String username) {
        return this.transactionRepository.getAllTransactionsByUser(username);
    }

    public TransactionEntity getTransactionByTransactionID(String transactionID) {
        return this.transactionRepository.getTransactionByTransactionID(transactionID);
    }

    public TransactionEntity updateTransaction(TransactionEntity transactionEntity) {
        return transactionRepository.updateTransaction(transactionEntity);
    }

    public TransactionEntity getTransactionState(String transactionID) {
        return getTransactionByTransactionID(transactionID);
    }

}

package com.escrowforgame.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.repository.TransactionRepository;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Slf4j
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public TransactionEntity createTransaction(TransactionDTO transactionDTO) throws DynamoDbException {
        TransactionEntity transactionEntity = transactionDTO.mapDTOtoEntity();
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

    // public TransactionEntity getTransactionState(String transactionID) {
    //     return getTransactionByTransactionID(transactionID);
    // }

}

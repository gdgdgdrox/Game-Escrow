package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.repository.TransactionRepository;

@Service
public class TransactionService {
 
    @Autowired
    private TransactionRepository transactionRepository;

    public void createTransaction(TransactionDTO transactionDTO){
        System.out.println(transactionDTO.toString());
        TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.mapDTOtoEntity(transactionDTO);
        System.out.println(transactionEntity.toString());
        transactionRepository.createTransaction(transactionEntity);
    }
}

package com.escrowforgame.server.controller.TransactionStep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.service.TransactionService;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Slf4j
@RestController
@RequestMapping("/api/transaction/step1")
public class TransactionStep1Controller {

    @Autowired
    private TransactionService transactionService;
    
    @PostMapping(value="/createTransaction")
    public ResponseEntity<TransactionEntity> createTransaction(@RequestBody TransactionDTO transactionDTO){
        log.info("in step 1 create transaction");
        try{
            TransactionEntity createdTransaction = transactionService.createTransaction(transactionDTO);
            log.info("new transaction created with txn id {}",createdTransaction.getTransactionID());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
        }
        catch (DynamoDbException d){
            log.error("error creating new transaction. {}",d.getMessage(),d);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
}

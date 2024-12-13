package com.escrowforgame.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.service.TransactionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @GetMapping("/transactions")
    public List<TransactionEntity> getAllTransactionsByUser(@RequestParam String username){
        log.info("in get all transactions for user: {}",username);
        List<TransactionEntity> transactions =  this.transactionService.getAllTransactionsByUser(username);
        log.debug("number of txn by {} = {}",username,transactions);
        return transactions;
    }


    
    @GetMapping("/transaction/{transactionID}")
    public ResponseEntity<TransactionEntity> getTransactionState(@PathVariable String transactionID) {
        log.info("retrieving txn {}",transactionID);
        TransactionEntity transaction = transactionService.getTransactionByTransactionID(transactionID);
        if (transaction != null) {
            log.info("retrieved");
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.notFound().build();
    }
}

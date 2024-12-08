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

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @GetMapping("/transactions")
    public List<TransactionEntity> getAllTransactionsByUser(@RequestParam String username){
        System.out.println("Getting all transactions for " + username);
        return this.transactionService.getAllTransactionsByUser(username);
    }

    @GetMapping("/transaction")
    public TransactionEntity getTransactionByTransactionID(@RequestParam String transactionID) throws InterruptedException{
        System.out.println("Getting transaction " + transactionID);
        // Thread.sleep(5000);
        return transactionService.getTransactionByTransactionID(transactionID);
    }

    @GetMapping("/transaction/{transactionID}")
    public ResponseEntity<TransactionEntity> getTransactionState(@PathVariable String transactionID) {
        TransactionEntity state = transactionService.getTransactionState(transactionID);
        if (state != null) {
            return ResponseEntity.ok(state);
        }
        return ResponseEntity.notFound().build();
    }
}

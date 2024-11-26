package com.escrowforgame.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.dto.TransactionDTO;
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
    public TransactionEntity getTransactionByTransactionID(@RequestParam String transactionID){
        System.out.println("Getting transaction " + transactionID);
        return transactionService.getTransactionByTransactionID(transactionID);
    }
}
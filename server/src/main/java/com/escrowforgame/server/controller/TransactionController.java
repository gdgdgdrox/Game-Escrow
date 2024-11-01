package com.escrowforgame.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.dto.TransactionDTO;

@RestController
@RequestMapping("/api")
public class TransactionController {
    
    @PostMapping(value="/createTransaction")
    public ResponseEntity<Void> createTransaction(@RequestBody TransactionDTO transactionDTO){
        System.out.println("In create transaction controller");
        System.out.println(transactionDTO.toString());
        return null;
    }
}

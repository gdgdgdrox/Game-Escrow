package com.escrowforgame.server.controller.TransactionStep;

import java.util.UUID;

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

import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@RestController
@RequestMapping("/api/step1")
public class TransactionStep1Controller {

    @Autowired
    private TransactionService transactionService;
    
    @PostMapping(value="/createTransaction")
    public ResponseEntity<TransactionEntity> createTransaction(@RequestBody TransactionDTO transactionDTO){
        System.out.println("In create transaction controller");
        System.out.println(transactionDTO.toString());
        try{
            TransactionEntity createdTransaction = transactionService.createTransaction(transactionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
        }
        catch (DynamoDbException d){
            System.err.println(d.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
}

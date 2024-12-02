package com.escrowforgame.server.controller.TransactionStep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.entity.TransactionStep3;
import com.escrowforgame.server.service.JwtService;
import com.escrowforgame.server.service.TransactionNotificationService;
import com.escrowforgame.server.service.TransactionService;

@RestController
@RequestMapping("/api/transaction/step2")
public class TransactionStep2Controller {

    @Autowired
    private TransactionNotificationService transactionNotificationService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JwtService jwtService;
    
    @PutMapping("/{transactionID}/accept")
    public ResponseEntity<TransactionEntity> acceptTrade(@PathVariable String transactionID, @RequestHeader("Authorization") String authorizationHeader ){
        System.out.println("counterparty accepted trade for " + transactionID);
        // update transaction in ddb
        TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);
        if (transactionEntity == null){
            return ResponseEntity.badRequest().body(null);
        }
        else{
            // this check ensures that the person who accepted the trade is indeed the counterparty of that trade.
            // otherwise a user that is not involved in a transaction can deceptively accept a trade if he knows the transactionID

            // TO DO: handle no JWT
            String jwt = authorizationHeader.substring(7);
            String userWhoSentAcceptedTheTrade = jwtService.extractUsername(jwt);
            String counterparty = transactionEntity.getCounterparty();
            if (userWhoSentAcceptedTheTrade.equals(counterparty)){
                System.out.println("current transaction entity" + transactionEntity.toString());
                transactionEntity.getTransactionSteps().getTransactionStep2().markTransactionStepAsCompleted();
                transactionEntity.setCurrentStep(3);
                if (null == transactionEntity.getTransactionSteps().getTransactionStep3()){
                    transactionEntity.getTransactionSteps().setTransactionStep3(new TransactionStep3());
                    System.out.println("updated transaction entity" + transactionEntity.toString());
                    TransactionEntity latestTransactionEntity = transactionService.updateTransaction(transactionEntity);
                    // inform
                    transactionNotificationService.notifyTransactionParticipants(latestTransactionEntity);
                    return ResponseEntity.ok(transactionEntity);
            }
                
        }
        return ResponseEntity.internalServerError().body(null);

    }}


}

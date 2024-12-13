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

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
        log.info("in step 2. counterparty accepted trade for txn id {}",transactionID);
        // update transaction in ddb
        TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);
        if (transactionEntity == null){
            log.error("did not find txn {}",transactionID);
            return ResponseEntity.badRequest().body(null);
        }
        else{
            // this check ensures that the person who accepted the trade is indeed the counterparty of that trade.
            // otherwise a user that is not involved in a transaction can deceptively accept a trade if he knows the transactionID

            log.debug("retrieved txn {}", transactionEntity.getTransactionID());
            String jwt = authorizationHeader.substring(7);
            String userWhoSentAcceptedTheTrade = jwtService.extractUsername(jwt);
            String counterparty = transactionEntity.getCounterparty();
            if (userWhoSentAcceptedTheTrade.equals(counterparty)){
                log.debug("marking step 2 as completed and setting curent step to 3");
                transactionEntity.getTransactionSteps().getTransactionStep2().markTransactionStepAsCompleted();
                transactionEntity.setCurrentStep(3);
                if (null == transactionEntity.getTransactionSteps().getTransactionStep3()){
                    transactionEntity.getTransactionSteps().setTransactionStep3(new TransactionStep3());
                    log.debug("updating txn in ddb {}",transactionEntity.toString());
                    TransactionEntity latestTransactionEntity = transactionService.updateTransaction(transactionEntity);
                    log.debug("updated");
                    // inform subscriber
                    transactionNotificationService.notifyStep2Completed(latestTransactionEntity);
                    return ResponseEntity.ok(transactionEntity);
            }
                
        }
        return ResponseEntity.internalServerError().body(null);

    }}


}

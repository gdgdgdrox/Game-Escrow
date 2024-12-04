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
import com.escrowforgame.server.entity.TransactionStep4;
import com.escrowforgame.server.service.JwtService;
import com.escrowforgame.server.service.TransactionNotificationService;
import com.escrowforgame.server.service.TransactionService;

@RestController
@RequestMapping("/api/transaction/step3")
public class TransactionStep3Controller {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionNotificationService transactionNotificationService;

    @Autowired
    private JwtService jwtService;

    @PutMapping("/{transactionID}/transferred")
    public ResponseEntity<TransactionEntity> onMoneyTransferred(@PathVariable String transactionID,
            @RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("money transferred for " + transactionID);
        // retrieve transaction, update step 3 to completed, initialize step 4 object,
        // save to db, publish to topic
        TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);
        if (transactionEntity == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            // TO DO: handle no JWT
            String jwt = authorizationHeader.substring(7);
            String userWhoTransferredMoney = jwtService.extractUsername(jwt);
            String buyer = transactionEntity.getBuyer();
            if (userWhoTransferredMoney.equals(buyer)) {
                System.out.println("current transaction entity" + transactionEntity.toString());
                transactionEntity.getTransactionSteps().getTransactionStep3().markTransactionStepAsCompleted();
                transactionEntity.setCurrentStep(4);
                if (null == transactionEntity.getTransactionSteps().getTransactionStep4()) {
                    transactionEntity.getTransactionSteps().setTransactionStep4(new TransactionStep4());
                    System.out.println("updated transaction entity" + transactionEntity.toString());
                    TransactionEntity latestTransactionEntity = transactionService.updateTransaction(transactionEntity);
                    // inform
                    transactionNotificationService.notifySellerThatStep3IsCompleted(latestTransactionEntity);
                    return ResponseEntity.ok(transactionEntity);
                }

            }
            return ResponseEntity.internalServerError().body(null);
        }

    }
}
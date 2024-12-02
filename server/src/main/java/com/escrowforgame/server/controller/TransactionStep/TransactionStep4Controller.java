package com.escrowforgame.server.controller.TransactionStep;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.entity.TransactionStep4;
import com.escrowforgame.server.service.JwtService;
import com.escrowforgame.server.service.TransactionNotificationService;
import com.escrowforgame.server.service.TransactionService;

@RestController
@RequestMapping("/api/transaction/step4")
public class TransactionStep4Controller {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionNotificationService transactionNotificationService;

    @PutMapping("/{transactionID}/buyer")
    public ResponseEntity<TransactionEntity> buyerConfirmItemReceived(@PathVariable String transactionID, @RequestHeader("Authorization") String authorizationHeader){
        System.out.println("buyer confirm item received");
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);


        if (username.equals(transactionEntity.getBuyer())){
            TransactionStep4 transactionStep4 = transactionEntity.getTransactionSteps().getTransactionStep4();
            if (transactionStep4 == null){
                transactionStep4 = new TransactionStep4();
            }
            transactionStep4.setStatus("completed");
            transactionEntity.getTransactionSteps().setTransactionStep4(transactionStep4);
            transactionEntity.setCurrentStep(5);
            transactionService.updateTransaction(transactionEntity);
            // broadcast
            transactionNotificationService.notifySellerThatStep4IsCompleted(transactionEntity);
            return ResponseEntity.ok(transactionEntity);

        }
        return ResponseEntity.badRequest().body(null);
    }
    
    @PutMapping("/{transactionID}/seller")
    public ResponseEntity<TransactionEntity> sellerConfirmItemReleased(@PathVariable String transactionID, @RequestHeader("Authorization") String authorizationHeader){
        System.out.println("seller confirm item released");
        String jwt = authorizationHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);


        if (username.equals(transactionEntity.getSeller())){
            TransactionStep4 transactionStep4 = transactionEntity.getTransactionSteps().getTransactionStep4();
            if (transactionStep4 == null){
                TransactionStep4 newTransactionStep4 = new TransactionStep4();
                transactionEntity.getTransactionSteps().setTransactionStep4(newTransactionStep4);
            }
            else{
                // buyer already confirmed item received. step 4 is now completed
                if (transactionStep4.isBuyerConfirmed()){
                    transactionStep4.setStatus("completed");
                    transactionStep4.setCompletedDate();
                    
                }
            }
            transactionService.updateTransaction(transactionEntity);
        }
        
        return null;
    }
}

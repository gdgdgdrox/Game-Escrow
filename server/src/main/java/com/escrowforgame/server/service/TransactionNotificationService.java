package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.entity.TransactionEntity;

@Service
public class TransactionNotificationService {
    @Autowired
     private SimpMessagingTemplate messagingTemplate;


    public void notifyStep2Completed(TransactionEntity transactionEntity) {
        messagingTemplate.convertAndSend(
            "/topic/transaction/step2/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }

    public void notifySellerThatStep3IsCompleted(TransactionEntity transactionEntity) {
        messagingTemplate.convertAndSend(
            "/topic/transaction/step3/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }

    public void notifySellerThatStep4IsCompleted(TransactionEntity transactionEntity) {
        System.out.println("Sending message to topic: /topic/transaction/step4/" + transactionEntity.getTransactionID());
        messagingTemplate.convertAndSend(
            "/topic/transaction/step4/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }


}

package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.entity.TransactionEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TransactionNotificationService {
    @Autowired
     private SimpMessagingTemplate messagingTemplate;


    public void notifyStep2Completed(TransactionEntity transactionEntity) {
        log.info("notifying subscriber that txn {} step 2 is completed",transactionEntity.getTransactionID());
        messagingTemplate.convertAndSend(
            "/topic/transaction/step2/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }

    public void notifySellerThatStep3IsCompleted(TransactionEntity transactionEntity) {
        log.info("notifying seller that txn {} step 3 is completed",transactionEntity.getTransactionID());
        messagingTemplate.convertAndSend(
            "/topic/transaction/step3/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }

    public void notifySellerThatStep4IsCompleted(TransactionEntity transactionEntity) {
       log.info("notifying seller that txn {} step 3 is completed",transactionEntity.getTransactionID());
        messagingTemplate.convertAndSend(
            "/topic/transaction/step4/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }


}

package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.entity.TransactionEntity;

@Service
public class TransactionNotificationService {
    @Autowired
     private SimpMessagingTemplate messagingTemplate;


    public void notifyTransactionParticipants(String transaction, TransactionEntity transactionEntity) {
        messagingTemplate.convertAndSend(
            "/topic/transaction/" + transactionEntity.getTransactionID(),
            transactionEntity
        );
    }
}

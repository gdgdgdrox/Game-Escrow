package com.escrowforgame.server.controller.TransactionStep;

import java.io.File;
import java.io.IOException;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.escrowforgame.server.entity.TransactionEntity;
import com.escrowforgame.server.entity.TransactionStep4;
import com.escrowforgame.server.entity.TransactionStep5;
import com.escrowforgame.server.service.JwtService;
import com.escrowforgame.server.service.S3Service;
import com.escrowforgame.server.service.TransactionNotificationService;
import com.escrowforgame.server.service.TransactionService;

import software.amazon.awssdk.services.s3.model.PutObjectResponse;

@RestController
@RequestMapping("/api/transaction/step4")
public class TransactionStep4Controller {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionNotificationService transactionNotificationService;

    @Autowired
    private S3Service s3Service;

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
            transactionStep4.markStep4AsCompleted();
            transactionEntity.getTransactionSteps().setTransactionStep4(transactionStep4);
            transactionEntity.setCurrentStep(5);
            transactionEntity.getTransactionSteps().setTransactionStep5(new TransactionStep5());
            transactionService.updateTransaction(transactionEntity);
            System.out.println(transactionEntity.toString());
            // notify seller
            transactionNotificationService.notifySellerThatStep4IsCompleted(transactionEntity);
            return ResponseEntity.ok(transactionEntity);

        }
        return ResponseEntity.badRequest().body(null);
    }
    
    @PostMapping("/{transactionID}/seller")
    public ResponseEntity<TransactionEntity> sellerUploadEvidence(@RequestParam("file") MultipartFile file,
    @PathVariable String transactionID){
        System.out.println("seller uploaded picture");
        String s3ObjectKey = String.format("%s_%s",transactionID,file.getOriginalFilename());
        try {
            PutObjectResponse putObjectResponse = s3Service.uploadToS3(file, s3ObjectKey);
            if (putObjectResponse.sdkHttpResponse().isSuccessful()){
                TransactionEntity transactionEntity = transactionService.getTransactionByTransactionID(transactionID);
                TransactionStep4 transactionStep4 = transactionEntity.getTransactionSteps().getTransactionStep4();
                if (transactionStep4 == null){
                    transactionStep4 = new TransactionStep4();
                }
                transactionStep4.setSellerPhotoUploaded(true);
                transactionStep4.setSellerPhotoEvidenceS3Key(transactionID + "_" + file.getOriginalFilename());
                transactionService.updateTransaction(transactionEntity);
                return ResponseEntity.status(HttpStatus.CREATED).body(transactionEntity);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(null);
        }
        return ResponseEntity.internalServerError().body(null);
        } 
    }

package com.escrowforgame.server.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.escrowforgame.server.dto.TransactionDTO;
import com.escrowforgame.server.entity.TransactionEntity;

import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Expression;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.Page;
import software.amazon.awssdk.enhanced.dynamodb.model.PageIterable;
import software.amazon.awssdk.enhanced.dynamodb.model.PutItemEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.PutItemEnhancedResponse;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Repository
public class TransactionRepository {

    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private final DynamoDbTable<TransactionEntity> dynamoDbTransactionTable;

    public TransactionRepository(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
        this.dynamoDbTransactionTable = this.dynamoDbEnhancedClient.table(
                "Transaction",
                TableSchema.fromBean(TransactionEntity.class));
    }

    // public DynamoDbTable<TransactionEntity> getTransactionTable() {
    // return dynamoDbEnhancedClient.table("Transaction",
    // TableSchema.fromBean(TransactionEntity.class));
    // }

    public void createTransaction(TransactionEntity transactionEntity) throws DynamoDbException {
        System.out.printf("Creating new Transaction Entity in DynamoDB with transaction ID=%s\n",
                transactionEntity.getTransactionID());
        dynamoDbTransactionTable.putItem(transactionEntity);
    }

    public TransactionEntity getTransactionByTransactionID(String transactionID) {
        return this.dynamoDbTransactionTable.getItem(Key.builder().partitionValue(transactionID).build());
    }

    public void getTransactionByCounterparty(String counterparty) {
        DynamoDbIndex<TransactionEntity> counterpartyIndex = this.dynamoDbTransactionTable.index("CounterpartyGSI");

        QueryConditional queryConditional = QueryConditional.keyEqualTo(
                Key.builder()
                        .partitionValue(counterparty)
                        .build());

        Iterable<Page<TransactionEntity>> results = (Iterable<Page<TransactionEntity>>) counterpartyIndex.query(
                QueryEnhancedRequest.builder()
                        .queryConditional(queryConditional)
                        .build());

        // Query the index
        for (Page<TransactionEntity> page : results) {
            page.items().forEach(item -> System.out.println(item.toString()));
        }
    }

    public List<TransactionEntity> getAllTransactionsByUser(String username) {
        Expression filterExpression = Expression.builder()
                .expression("#buyer = :buyerValue OR #seller = :sellerValue OR #counterparty = :counterpartyValue")
                .putExpressionName("#buyer", "buyer")
                .putExpressionName("#seller", "seller")
                .putExpressionName("#counterparty", "counterparty")
                .putExpressionValue(":buyerValue", AttributeValue.builder().s(username).build())
                .putExpressionValue(":sellerValue", AttributeValue.builder().s(username).build())
                .putExpressionValue(":counterpartyValue", AttributeValue.builder().s(username).build())
                .build();

        // Create the scan request
        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(filterExpression)
                .build();

        // Perform the scan and return the results
        PageIterable<TransactionEntity> pages = this.dynamoDbTransactionTable.scan(scanRequest);
        // List<TransactionDTO> transactions = pages.items().stream().map(item ->
        // item.mapEntityToDTO()).collect(Collectors.toList());
        List<TransactionEntity> transactions = pages.items().stream().toList();
        return transactions;
    }

    public TransactionEntity updateTransaction(TransactionEntity transactionEntity) {
        return this.dynamoDbTransactionTable.updateItem(transactionEntity);
    }

}

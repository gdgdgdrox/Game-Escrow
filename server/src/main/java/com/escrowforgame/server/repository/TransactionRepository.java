package com.escrowforgame.server.repository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.escrowforgame.server.entity.TransactionEntity;

import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbIndex;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.Page;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;

@Repository
public class TransactionRepository {
    @Autowired
    private DynamoDbEnhancedClient dynamoDbEnhancedClient;

    public DynamoDbTable<TransactionEntity> getTransactionTable() {
        return dynamoDbEnhancedClient.table("Transaction", TableSchema.fromBean(TransactionEntity.class));
    }

    public void createTransaction(TransactionEntity transactionEntity) {
        System.out.printf("Inserting %s\n", transactionEntity.getTransactionID());
        DynamoDbTable<TransactionEntity> transactionTable = getTransactionTable();
        transactionTable.putItem(transactionEntity);
    }

    public TransactionEntity getTransactionByTransactionID(String transactionID) {
        return getTransactionTable().getItem(Key.builder().partitionValue(transactionID).build());
    }

    public void getTransactionByCounterparty(String counterparty) {
        DynamoDbIndex<TransactionEntity> counterpartyIndex = getTransactionTable().index("CounterpartyGSI");

        QueryConditional queryConditional = QueryConditional.keyEqualTo(
                Key.builder()
                        .partitionValue(counterparty)
                        .build());

        Iterable<Page<TransactionEntity>> results = (Iterable<Page<TransactionEntity>>) counterpartyIndex.query(
                QueryEnhancedRequest.builder()
                        .queryConditional(queryConditional)
                        .build());

        // Query the index
       for (Page<TransactionEntity> page : results){
        page.items().forEach(item -> System.out.println(item.toString()));
       }
    }

}

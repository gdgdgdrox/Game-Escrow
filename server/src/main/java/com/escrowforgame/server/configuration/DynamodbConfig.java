package com.escrowforgame.server.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

@Slf4j
@Configuration
public class DynamodbConfig {
    // use the default credentials provider chain
    // based on the retrieval order, AWS will retrieve EC2 instance IAM role-provided credentials at the very last
    // we have configured an IAM role on our EC2 instance running this App with full access to DynamoDB
    @Bean
    public DynamoDbEnhancedClient dynamoDbEnhancedClient(){
        return DynamoDbEnhancedClient.builder()
                .dynamoDbClient(DynamoDbClient.builder().region(Region.US_EAST_1).build())
                .build();
    }
    
}

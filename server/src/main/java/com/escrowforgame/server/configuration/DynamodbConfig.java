package com.escrowforgame.server.configuration;

import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbClientBuilder;

@Slf4j
@Configuration
public class DynamodbConfig {

    @Value("${amazon.dynamodb.endpoint}")
    private String amazonDynamoDBEndpoint;

    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;

    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;
    
    @Bean
    public DynamoDbEnhancedClient dynamoDbEnhancedClient(){
        DynamoDbClientBuilder builder = DynamoDbClient.builder().region(Region.US_EAST_1);
        log.debug("Endpoint: {} | Access key: {} | Secret key: {}",amazonDynamoDBEndpoint,amazonAWSAccessKey,amazonAWSSecretKey);
        if (!amazonAWSAccessKey.isEmpty() && !amazonAWSSecretKey.isEmpty()) {
            // Use static credentials for non-EC2 environments
            builder.credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(amazonAWSAccessKey, amazonAWSSecretKey)
            ));
        }

        return DynamoDbEnhancedClient.builder()
                .dynamoDbClient(builder.build())
                .build();
    }
    
}

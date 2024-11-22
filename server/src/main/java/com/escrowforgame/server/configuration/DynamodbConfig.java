package com.escrowforgame.server.configuration;

import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

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
        DynamoDbClient builder = DynamoDbClient.builder()
            .region(Region.US_EAST_1)
            .endpointOverride(URI.create(amazonDynamoDBEndpoint)) 
            .credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(amazonAWSAccessKey, amazonAWSSecretKey) 
            ))
            .build();
        
        return DynamoDbEnhancedClient.builder().dynamoDbClient(builder).build();
    }
}

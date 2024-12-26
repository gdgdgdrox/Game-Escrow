package com.escrowforgame.server.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.services.ssm.SsmClient;

@Configuration
public class ParameterStoreConfig {
    
    @Autowired
    private AwsCredentialsProvider awsCredentialsProvider;
    
    @Bean
    public SsmClient ssmClient() {
        return SsmClient.builder().credentialsProvider(awsCredentialsProvider).build();
    }
}

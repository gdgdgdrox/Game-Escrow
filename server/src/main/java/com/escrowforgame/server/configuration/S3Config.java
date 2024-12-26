package com.escrowforgame.server.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Autowired
    private AwsCredentialsProvider awsCredentialsProvider;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder().region(Region.US_EAST_1).credentialsProvider(awsCredentialsProvider).build();
    }
}

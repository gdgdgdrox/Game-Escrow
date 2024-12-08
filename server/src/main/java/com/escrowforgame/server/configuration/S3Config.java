package com.escrowforgame.server.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    // @Value("${aws.s3.access.key}")
    // private String accessKey;

    // @Value("${aws.s3.secret.access.key}")
    // private String secretAccessKey;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder().region(Region.US_EAST_1)
                .credentialsProvider(ProfileCredentialsProvider.create("s3_game_escrow")).build();
    }
}
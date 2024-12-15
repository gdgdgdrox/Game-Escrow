package com.escrowforgame.server.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Bean
    public S3Client s3Client() {
        // use the default credentials provider chain
        // based on the retrieval order, AWS will retrieve EC2 instance IAM role-provided credentials at the very last
        // we have configured an IAM role on our EC2 instance running this App with full access to S3
        return S3Client.builder().region(Region.US_EAST_1).build();
    }
}

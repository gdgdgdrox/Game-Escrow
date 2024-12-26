package com.escrowforgame.server.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;

@Slf4j
@Configuration
public class AWSCredentialsConfig {

    @Bean
    public AwsCredentialsProvider awsCredentialsProvider(Environment environment) {
        String[] activeProfiles = environment.getActiveProfiles();
        log.debug("active profile {}",Arrays.toString(activeProfiles));
        if (activeProfiles.length > 0 && "prod".equals(activeProfiles[0])) {
            // Use IAM role on EC2 in production
            log.debug("Using InstanceProfileCredentialsProvider (IAM role attached to EC2) for prod");
            return InstanceProfileCredentialsProvider.create();
        } else {
            // Use local-user-for-game-escrow profile in development
            log.debug("Using ProfileCredentialsProvider (local-user-for-game-escrow profile) for dev");
            return ProfileCredentialsProvider.builder()
                    .profileName("local-user-for-game-escrow")
                    .build();
        }
    }
}

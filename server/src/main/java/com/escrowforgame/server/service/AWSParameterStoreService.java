package com.escrowforgame.server.service;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;
import software.amazon.awssdk.services.ssm.model.GetParameterResponse;
import software.amazon.awssdk.services.ssm.model.SsmException;

@Service
public class AWSParameterStoreService{

    private final SsmClient ssmClient;
    public AWSParameterStoreService() {
        this.ssmClient = SsmClient.create();  // Uses default credentials provider
    }

    public String getParameter(String parameterName, boolean decrpyt) {
        try {
            GetParameterRequest request = GetParameterRequest.builder()
                    .name(parameterName)
                    .withDecryption(decrpyt)
                    .build();

            GetParameterResponse result = ssmClient.getParameter(request);
            return result.parameter().value();
        } catch (SsmException e) {
            throw new RuntimeException("Error fetching parameter: " + parameterName, e);
        }
    }

}
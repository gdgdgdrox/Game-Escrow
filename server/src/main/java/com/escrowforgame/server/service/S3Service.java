package com.escrowforgame.server.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

@Service
public class S3Service {

    @Value("${aws.s3.bucket.name}")
    private String bucket;

    @Autowired
    private S3Client s3Client;

    public PutObjectResponse uploadToS3(MultipartFile file, String s3ObjectKey) throws IOException {
        File tempFile;
        tempFile = File.createTempFile("upload", file.getOriginalFilename());
        file.transferTo(tempFile);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucket).key(s3ObjectKey).build();
        return this.s3Client.putObject(putObjectRequest, tempFile.toPath());
    }
}
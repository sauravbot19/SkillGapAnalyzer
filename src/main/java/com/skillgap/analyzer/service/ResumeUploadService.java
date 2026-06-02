package com.skillgap.analyzer.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.skillgap.analyzer.entity.Resume;
import com.skillgap.analyzer.entity.User;
import com.skillgap.analyzer.repository.ResumeRepository;
import com.skillgap.analyzer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

// To handle resume uploads, store files in AWS S3, and save metadata in the database
@Service
@RequiredArgsConstructor
public class ResumeUploadService {

    private final AmazonS3 amazonS3;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Value("${aws.s3-bucket}")
    private String bucketName;

    public Resume uploadResume(MultipartFile file, String userEmail) throws IOException {

        // find the user from DB
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));

        // generate unique filename to avoid overwriting files
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // set metadata — S3 needs content type and size
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        // upload to S3
        amazonS3.putObject(bucketName, fileName, file.getInputStream(), metadata);

        // build the public S3 URL
        String s3Url = amazonS3.getUrl(bucketName, fileName).toString();

        // save resume metadata to DB
        Resume resume = Resume.builder()
                .user(user)
                .s3Url(s3Url)
                .fileName(file.getOriginalFilename())
                .build();

        return resumeRepository.save(resume);
    }
}
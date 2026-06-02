package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.entity.Resume;
import com.skillgap.analyzer.service.ResumeUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

// To handle resume upload requests, authenticate users, and delegate to the service layer for processing
@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeUploadService resumeUploadService;

    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) {

        try {
            Resume resume = resumeUploadService.uploadResume(file, userDetails.getUsername());
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
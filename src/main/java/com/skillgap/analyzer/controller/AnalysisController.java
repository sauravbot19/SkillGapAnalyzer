package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.dto.AnalysisRequest;
import com.skillgap.analyzer.dto.AnalysisResponse;
import com.skillgap.analyzer.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    // trigger AI analysis — upload resume ID + paste job description
    @PostMapping("/start")
    public ResponseEntity<AnalysisResponse> startAnalysis(
            @RequestBody AnalysisRequest request) {
        return ResponseEntity.ok(analysisService.startAnalysis(request));
    }

    // get all analyses for the logged in user
    @GetMapping("/history")
    public ResponseEntity<List<AnalysisResponse>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(analysisService.getHistory(userDetails.getUsername()));
    }

    // get single analysis by ID
    @GetMapping("/{id}")
    public ResponseEntity<AnalysisResponse> getAnalysis(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(analysisService.getAnalysisById(id, userDetails.getUsername()));
    }

    // delete an analysis
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalysis(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        analysisService.deleteAnalysis(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
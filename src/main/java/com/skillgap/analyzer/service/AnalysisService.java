package com.skillgap.analyzer.service;

import com.skillgap.analyzer.dto.AnalysisRequest;
import com.skillgap.analyzer.dto.AnalysisResponse;
import com.skillgap.analyzer.entity.Analysis;
import com.skillgap.analyzer.entity.Resume;
import com.skillgap.analyzer.repository.AnalysisRepository;
import com.skillgap.analyzer.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalysisService {

    private final ResumeRepository resumeRepository;
    private final AnalysisRepository analysisRepository;
    private final PdfTextExtractorService pdfTextExtractorService;
    private final GroqAiService groqAiService;

    public AnalysisResponse startAnalysis(AnalysisRequest request) {

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found: " + request.getResumeId()));

        String resumeText;
        try {
            resumeText = pdfTextExtractorService.extractTextFromS3(resume.getS3Url());
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text from resume: " + e.getMessage());
        }

        AnalysisResponse aiResult = groqAiService.analyzeResume(resumeText, request.getJobDescription());

        Analysis analysis = Analysis.builder()
                .resume(resume)
                .jdText(request.getJobDescription())
                .matchPercentage(aiResult.getMatchPercentage())
                .matchingSkills(aiResult.getMatchingSkills())
                .missingSkills(aiResult.getMissingSkills())
                .suggestions(aiResult.getSuggestions())
                .verdict(aiResult.getVerdict())
                .build();

        Analysis saved = analysisRepository.save(analysis);
        aiResult.setAnalysisId(saved.getId());
        return aiResult;
    }

    public List<AnalysisResponse> getHistory(String userEmail) {
        return analysisRepository.findByResumeUserId(
                resumeRepository.findAll().stream()
                        .filter(r -> r.getUser().getEmail().equals(userEmail))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("No resumes found"))
                        .getUser().getId()
        ).stream().map(a -> AnalysisResponse.builder()
                .analysisId(a.getId())
                .matchPercentage(a.getMatchPercentage())
                .matchingSkills(a.getMatchingSkills())
                .missingSkills(a.getMissingSkills())
                .suggestions(a.getSuggestions())
                .verdict(a.getVerdict())
                .build()
        ).collect(Collectors.toList());
    }

    public AnalysisResponse getAnalysisById(Long id, String userEmail) {
        Analysis a = analysisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analysis not found: " + id));

        if (!a.getResume().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }

        return AnalysisResponse.builder()
                .analysisId(a.getId())
                .matchPercentage(a.getMatchPercentage())
                .matchingSkills(a.getMatchingSkills())
                .missingSkills(a.getMissingSkills())
                .suggestions(a.getSuggestions())
                .verdict(a.getVerdict())
                .build();
    }

    public void deleteAnalysis(Long id, String userEmail) {
        Analysis a = analysisRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Analysis not found: " + id));

        if (!a.getResume().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }

        analysisRepository.deleteById(id);
    }
}
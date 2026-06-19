package com.skillgap.analyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillgap.analyzer.dto.AnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqAiService {

    private final WebClient groqWebClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${groq.model}")
    private String model;

    public AnalysisResponse analyzeResume(String resumeText, String jobDescription) {

        // build the prompt — instruct Groq to return ONLY JSON
        String prompt = buildPrompt(resumeText, jobDescription);

        // build the request body for Groq API
        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content",
                                "You are an ATS (Applicant Tracking System) expert. " +
                                        "Always respond with valid JSON only. No explanation, no markdown."),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.3,
                "max_tokens", 1000
        );

        // call Groq API and get raw response
        String rawResponse = groqWebClient.post()
                .uri("/openai/v1/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // parse and return
        return parseGroqResponse(rawResponse);
    }

    private String buildPrompt(String resumeText, String jobDescription) {
        return """
                Analyze the following resume against the job description.
                
                RESUME:
                %s
                
                JOB DESCRIPTION:
                %s
                
                Return ONLY a JSON object with exactly these fields:
                {
                  "matchPercentage": <number 0-100>,
                  "matchingSkills": "<comma separated skills found in both>",
                  "missingSkills": "<comma separated skills in JD but not in resume>",
                  "suggestions": "<2-3 specific improvement suggestions>",
                  "verdict": "<one of: Strong Match, Good Match, Moderate Match, Weak Match>"
                }
                """.formatted(resumeText, jobDescription);
    }

    private AnalysisResponse parseGroqResponse(String rawResponse) {
        try {
            // extract the content field from Groq's response wrapper
            JsonNode root = objectMapper.readTree(rawResponse);
            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            // parse the JSON content returned by the AI
            JsonNode result = objectMapper.readTree(content);

            return AnalysisResponse.builder()
                    .matchPercentage(result.path("matchPercentage").asInt())
                    .matchingSkills(result.path("matchingSkills").asText())
                    .missingSkills(result.path("missingSkills").asText())
                    .suggestions(result.path("suggestions").asText())
                    .verdict(result.path("verdict").asText())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Groq response: " + e.getMessage());
        }
    }
}
package com.skillgap.analyzer.service;

import tools.jackson.databind.JsonNode;
import com.skillgap.analyzer.dto.AnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqAiService {

    private final WebClient groqWebClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${groq.model}")
    private String model;

    private static final String SYSTEM_PROMPT =
            "You are an ATS (Applicant Tracking System) expert. " +
                    "Respond ONLY with raw JSON. No markdown, no explanation, no preamble.";

    // To analyze a resume against a job description using Groq's API
    public AnalysisResponse analyzeResume(String resumeText, String jobDescription) {

        String prompt = buildPrompt(resumeText, jobDescription);

        // build the request body for Groq API
        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content",
                                SYSTEM_PROMPT),
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
        You are a senior ATS (Applicant Tracking System) expert and technical recruiter with deep knowledge of software engineering roles.
        Analyze the candidate's resume against the job description with precision.

        RESUME:
        %s

        JOB DESCRIPTION:
        %s

        Analysis Instructions:
        - matchingSkills: List ONLY skills explicitly required in the JD AND clearly present in the resume.
          Include tools, frameworks, languages, methodologies. Be specific (e.g. "Spring Boot" not just "Java frameworks").
        - missingSkills: List ONLY skills that meet ALL THREE of these conditions:
            1. The skill is explicitly required or strongly implied by the JD
            2. The skill is NOT found anywhere in the resume (including experience bullets, skills section, or project descriptions)
            3. The absence genuinely hurts the candidate's fit for this role
          DO NOT list a skill as missing if it appears anywhere in the resume, even implicitly.
          DO NOT list skills from the resume that are not required by the JD (e.g. Azure AI, Anthropic AI).
          Before finalizing missingSkills, re-read the resume and confirm each item is truly absent.
        - suggestions: Give 3-5 SPECIFIC, actionable suggestions. Each suggestion must:
            * Reference a concrete gap or weakness found in THIS resume
            * Tell the candidate exactly what to add, reword, or emphasize
            * Never contradict itself (e.g. do NOT say "mention X even if not required" when X IS required)
            * If a skill is in missingSkills, tell the candidate to GAIN or clearly highlight that skill — not downplay it
            * Be a complete sentence ending with a period.
        - matchPercentage: A realistic integer 0-100 representing how well the resume covers JD requirements.
          Penalize for experience gaps, missing required skills, and location mismatch if relevant.
        - verdict: Choose exactly one based on matchPercentage:
            * Strong Match  → 85-100
            * Good Match    → 70-84
            * Moderate Match → 50-69
            * Weak Match    → below 50

        Rules:
        - Do NOT invent skills not present in the resume or JD.
        - Do NOT be overly generous — be honest and realistic.
        - Do NOT list a skill as missing if it is present in the resume in any form.
        - Do NOT list resume skills as missing just because they weren't required by the JD.
        - Do NOT produce vague suggestions like "highlight your skills" — every suggestion must name the SPECIFIC skill or achievement.
        - matchingSkills and missingSkills must be comma-separated values (no bullet points, no numbering).
        - suggestions must be 3-5 complete sentences separated by a single space.
        - Return ONLY a valid JSON object. No explanation, no markdown, no extra text.

        Return exactly this JSON structure:
        {
          "matchPercentage": <integer 0-100>,
          "matchingSkills": "<comma separated list>",
          "missingSkills": "<comma separated list>",
          "suggestions": "<3-5 complete sentences separated by spaces>",
          "verdict": "<Strong Match | Good Match | Moderate Match | Weak Match>"
        }
        """.formatted(resumeText, jobDescription);
    }
    // To extract the relevant information from Groq's response and convert it into our AnalysisResponse DTO
    private AnalysisResponse parseGroqResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            String content = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            JsonNode result = objectMapper.readTree(content);

            return AnalysisResponse.builder()
                    .matchPercentage(result.path("matchPercentage").asInt())
                    .matchingSkills(nodeToString(result.path("matchingSkills")))
                    .missingSkills(nodeToString(result.path("missingSkills")))
                    .suggestions(nodeToString(result.path("suggestions")))
                    .verdict(result.path("verdict").asText())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Groq response: " + e.getMessage());
        }
    }

    // handles both String and Array responses from AI
    private String nodeToString(JsonNode node) {
        if (node.isArray()) {
            StringBuilder sb = new StringBuilder();
            node.forEach(n -> {
                if (sb.length() > 0) sb.append(", ");
                sb.append(n.asText());
            });
            return sb.toString();
        }
        return node.asText();
    }
    
}
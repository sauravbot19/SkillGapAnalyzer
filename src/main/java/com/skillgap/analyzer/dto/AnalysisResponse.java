package com.skillgap.analyzer.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    private Long analysisId;
    private Integer matchPercentage;
    private String matchingSkills;
    private String missingSkills;
    private String suggestions;
    private String verdict;
}

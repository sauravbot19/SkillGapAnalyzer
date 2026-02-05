package com.skillgap.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SkillRecommendationResponse {

    private String skillName;
    private int requiredLevel;
    private int userLevel;
    private String recommendation;
}

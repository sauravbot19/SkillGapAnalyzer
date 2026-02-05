package com.skillgap.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SkillGapResponse {

    private String skillName;
    private int requiredLevel;
    private int userLevel;
    private String gapStatus;
}
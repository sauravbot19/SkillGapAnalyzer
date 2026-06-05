package com.skillgap.analyzer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalysisRequest {
    private Long resumeId;
    private String jobDescription;
}

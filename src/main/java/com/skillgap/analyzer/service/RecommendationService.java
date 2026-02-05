package com.skillgap.analyzer.service;

import com.skillgap.analyzer.dto.SkillGapResponse;
import com.skillgap.analyzer.dto.SkillRecommendationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SkillGapService skillGapService;

    public List<SkillRecommendationResponse> getRecommendations(Long userId, Long roleId) {

        List<SkillGapResponse> gaps = skillGapService.calculateGap(userId, roleId);
        List<SkillRecommendationResponse> recommendations = new ArrayList<>();

        for (SkillGapResponse gap : gaps) {

            String rec;

            switch (gap.getGapStatus()) {
                case "MISSING":
                    rec = "Start learning this skill from basics";
                    break;
                case "NEED_IMPROVEMENT":
                    rec = "Improve proficiency through practice/projects";
                    break;
                default:
                    rec = "Skill level is sufficient";
            }

            recommendations.add(new SkillRecommendationResponse(
                    gap.getSkillName(),
                    gap.getRequiredLevel(),
                    gap.getUserLevel(),
                    rec
            ));
        }

        return recommendations;
    }
}

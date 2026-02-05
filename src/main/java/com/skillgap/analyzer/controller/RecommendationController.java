package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.dto.SkillRecommendationResponse;
import com.skillgap.analyzer.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/user/{userId}/role/{roleId}")
    public List<SkillRecommendationResponse> getRecommendations(
            @PathVariable Long userId,
            @PathVariable Long roleId) {

        return recommendationService.getRecommendations(userId, roleId);
    }
}

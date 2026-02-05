package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.dto.SkillGapResponse;
import com.skillgap.analyzer.service.SkillGapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skill-gap")
@RequiredArgsConstructor
public class SkillGapController {

    private final SkillGapService skillGapService;

    @GetMapping("/user/{userId}/role/{roleId}")
    public List<SkillGapResponse> getSkillGap(
            @PathVariable Long userId,
            @PathVariable Long roleId) {

        return skillGapService.calculateGap(userId, roleId);
    }
}

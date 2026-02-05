package com.skillgap.analyzer.service;

import com.skillgap.analyzer.dto.SkillGapResponse;
import com.skillgap.analyzer.entity.RoleSkill;
import com.skillgap.analyzer.entity.UserSkill;
import com.skillgap.analyzer.repository.RoleSkillRepository;
import com.skillgap.analyzer.repository.UserSkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SkillGapService {

    private final RoleSkillRepository roleSkillRepo;
    private final UserSkillRepository userSkillRepo;

    public List<SkillGapResponse> calculateGap(Long userId, Long roleId) {

        List<RoleSkill> roleSkills = roleSkillRepo.findByRoleId(roleId);
        List<UserSkill> userSkills = userSkillRepo.findByUserId(userId);

        Map<Long, Integer> userSkillMap = new HashMap<>();
        for (UserSkill us : userSkills) {
            userSkillMap.put(us.getSkill().getId(), us.getProficiencyLevel());
        }

        List<SkillGapResponse> result = new ArrayList<>();

        for (RoleSkill rs : roleSkills) {

            Long skillId = rs.getSkill().getId();
            int required = rs.getRequiredLevel();
            int userLevel = userSkillMap.getOrDefault(skillId, 0);

            String status;
            if (userLevel == 0) {
                status = "MISSING";
            } else if (userLevel < required) {
                status = "NEED_IMPROVEMENT";
            } else {
                status = "OK";
            }

            result.add(new SkillGapResponse(
                    rs.getSkill().getName(),
                    required,
                    userLevel,
                    status
            ));
        }

        return result;
    }
}
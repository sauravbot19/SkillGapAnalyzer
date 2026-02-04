package com.skillgap.analyzer.service;

import com.skillgap.analyzer.entity.RoleSkill;
import com.skillgap.analyzer.repository.RoleSkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleSkillService {

    private final RoleSkillRepository roleSkillRepository;

    public RoleSkill addRoleSkill(RoleSkill roleSkill) {
        return roleSkillRepository.save(roleSkill);
    }

    public List<RoleSkill> getSkillsByRole(Long roleId) {
        return roleSkillRepository.findByRoleId(roleId);
    }
}

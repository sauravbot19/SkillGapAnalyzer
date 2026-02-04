package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.entity.RoleSkill;
import com.skillgap.analyzer.service.RoleSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role-skills")
@RequiredArgsConstructor
public class RoleSkillController {

    private final RoleSkillService roleSkillService;

    @PostMapping
    public RoleSkill addRoleSkill(@RequestBody RoleSkill roleSkill) {
        return roleSkillService.addRoleSkill(roleSkill);
    }

    @GetMapping("/role/{roleId}")
    public List<RoleSkill> getRoleSkills(@PathVariable Long roleId) {
        return roleSkillService.getSkillsByRole(roleId);
    }
}

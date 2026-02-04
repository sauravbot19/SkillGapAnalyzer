package com.skillgap.analyzer.repository;

import com.skillgap.analyzer.entity.RoleSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleSkillRepository extends JpaRepository<RoleSkill, Long> {

    List<RoleSkill> findByRoleId(Long roleId);
}

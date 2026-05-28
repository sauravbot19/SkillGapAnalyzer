package com.skillgap.analyzer.repository;

import com.skillgap.analyzer.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
    List<Analysis> findByResumeUserId(Long resumeId);
}

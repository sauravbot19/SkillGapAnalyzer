package com.skillgap.analyzer.repository;

import com.skillgap.analyzer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

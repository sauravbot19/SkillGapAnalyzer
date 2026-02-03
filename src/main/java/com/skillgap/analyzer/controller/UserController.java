package com.skillgap.analyzer.controller;

import com.skillgap.analyzer.entity.User;
import com.skillgap.analyzer.entity.UserSkill;
import com.skillgap.analyzer.service.UserService;
import com.skillgap.analyzer.service.UserSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.skillgap.analyzer.repository.UserRepository;


import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserSkillService userSkillService;
    private final UserRepository userRepository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/{userId}/skills")
    public UserSkill addSkillToUser(
            @PathVariable Long userId,
            @RequestParam Long skillId,
            @RequestParam int level) {
        return userSkillService.addSkillToUser(userId, skillId, level);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}/skills")
    public List<UserSkill> getUserSkills(@PathVariable Long userId) {
        return userSkillService.getUserSkills(userId);
    }
}

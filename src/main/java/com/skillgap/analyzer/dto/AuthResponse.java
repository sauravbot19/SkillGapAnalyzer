package com.skillgap.analyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String name;
    private String email;
}

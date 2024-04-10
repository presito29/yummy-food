package com.example.demo.response;

import com.example.demo.model.enums.RoleEnums;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;

    private String message;

    private RoleEnums role;
}

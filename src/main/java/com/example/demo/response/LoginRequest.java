package com.example.demo.response;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;

    private String password;
}

package com.example.demo.request_response;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;

    private String password;
}

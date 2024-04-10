package com.example.demo.model.dto;

import com.example.demo.validators.password.PasswordMatch;
import com.example.demo.validators.user.ValidateUsernameExistence;

import lombok.*;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@PasswordMatch(password = "password", confirmPassword = "confirmPassword")
public class RegisterUserDto {

    private Long id;


    @NotBlank(message = "Username is mandatory")
    @Size(min = 3, message = "Username too short")
    @ValidateUsernameExistence(message = "This username already exists!")
    private String username;

    @NotBlank(message = "Email is incorrect!")
    @Email
    private String email;

    @NotBlank(message = "First name is mandatory")
    @Size(min = 3, message = "First name too short")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Size(min = 3, message="Last name too short")
    private String lastName;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String confirmPassword;




}

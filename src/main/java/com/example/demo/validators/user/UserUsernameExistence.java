package com.example.demo.validators.user;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserUsernameExistence implements ConstraintValidator<ValidateUsernameExistence, String> {

    private final UserRepository userRepository;

    @Autowired
    public UserUsernameExistence(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public void initialize(ValidateUsernameExistence constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        return this.userRepository.findByUsername(username).isEmpty();
    }
}


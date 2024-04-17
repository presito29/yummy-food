package com.example.demo.controller;

import com.example.demo.config.JwtProvider;
import com.example.demo.model.entity.User;
import com.example.demo.response.AuthResponse;
import com.example.demo.response.LoginRequest;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {



    private final JwtProvider jwtProvider;

    private final UserService userService;

    @Autowired
    public AuthController(JwtProvider jwtProvider, UserService userService) {
        this.jwtProvider = jwtProvider;


        this.userService = userService;
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody User user) throws Exception {
        User savedUser = userService.createUser(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Register success");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return userService.confirmEmail(confirmationToken);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> singIn(@RequestBody LoginRequest request){

        AuthResponse authResponse = userService.login(request);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id){


        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);

    }


}

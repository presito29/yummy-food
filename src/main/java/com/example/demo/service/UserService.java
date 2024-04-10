package com.example.demo.service;

import com.example.demo.config.JwtProvider;
import com.example.demo.model.entity.Cart;
import com.example.demo.model.entity.User;
import com.example.demo.model.enums.RoleEnums;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.response.AuthResponse;
import com.example.demo.response.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;


@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtProvider jwtProvider;

    private final CustomerUserDetailsService customerUserDetailsService;

    private final CartRepository cartRepository;
    private final EmailService emailService;

   @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, CustomerUserDetailsService customerUserDetailsService, CartRepository cartRepository, EmailService emailService) {
        this.userRepository = userRepository;
       this.jwtProvider = jwtProvider;
       this.customerUserDetailsService = customerUserDetailsService;
       this.cartRepository = cartRepository;
       this.passwordEncoder = passwordEncoder;
       this.emailService = emailService;
   }

    public User createUser(User user) throws Exception {
        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist != null){
            throw new Exception("Email is already used with another account");

        }

        User created = User.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();

        User savedUser = userRepository.save(created);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        emailService.sendVerificationEmail(user.getEmail(), "verification");
        cartRepository.save(cart);
        return savedUser;
    }

    public AuthResponse login(LoginRequest request){

        String email = request.getEmail();
        String password = request.getPassword();

        Authentication authentication = autheticate(email, password);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login success");
        authResponse.setRole(RoleEnums.valueOf(role));

        return authResponse;
    }

    private Authentication autheticate(String email, String password) {

        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

        if (userDetails == null){
            throw new BadCredentialsException("Invalid email...");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password...");

        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public User findUserByJwtToken(String jwt) throws Exception{
       String email = jwtProvider.getEmailFormatJwtToken(jwt);
       User user = findUserByEmail(email);
       return user;

    }

    public User findUserByEmail(String email) throws Exception{

       User user = userRepository.findByEmail(email);

       if(user == null){
           throw new Exception("User not found");
       }

        return user;

    }

    public User findUserById(Long id) {
       return userRepository.findById(id).orElseThrow();}
}

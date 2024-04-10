package com.example.demo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.hibernate.annotations.SecondaryRow;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtProvider {

    private SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication authentication){
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
         String roles = populateAuthorities(authorities);

         String jwt = Jwts.builder().setIssuedAt(new Date())
                 .setExpiration((new Date(new Date().getTime() + 86400000)))
                 .claim("email", authentication.getName())
                 .claim("authorities", roles)
                 .signWith(key)
                 .compact();

        return jwt;
    }

    public String getEmailFormatJwtToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));

        return email;
    }
    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {

        Set<String> auths = new HashSet<>();

        for (GrantedAuthority authority: authorities) {
            auths.add(authority.getAuthority());

        }
        return String.join(",", auths);
    }

}

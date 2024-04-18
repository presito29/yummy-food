package com.example.demo.model.entity;

import com.example.demo.model.enums.RoleEnums;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties( ignoreUnknown = true, value = {"orders", "reservations", "addresses"})
@Table(name="users")
public class User extends  BaseEntity{


    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    private RoleEnums role = RoleEnums.USER;

    private boolean isEnabled;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Address> addresses;
}

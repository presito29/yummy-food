package com.example.demo.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ConfirmationToken(User user) {
        this.user = user;
        this.confirmationToken = UUID.randomUUID().toString();
        this.createdDate = new Date();
    }
}

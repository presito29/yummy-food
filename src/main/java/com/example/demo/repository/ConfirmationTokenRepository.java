package com.example.demo.repository;

import com.example.demo.model.entity.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("confirmationTokenRepository")
public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {

    ConfirmationToken findByConfirmationToken(String confirmationToken);
}

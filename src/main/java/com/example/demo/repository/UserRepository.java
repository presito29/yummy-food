package com.example.demo.repository;

import com.example.demo.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
     User findByEmail(String email);
     User getUserByUsername(String username);
    Optional<User>  findByUsername(String username);

    Optional<User> findUserByUsername(String username);

    Optional<User> findOneByEmailAndPassword(String email, String password);
}


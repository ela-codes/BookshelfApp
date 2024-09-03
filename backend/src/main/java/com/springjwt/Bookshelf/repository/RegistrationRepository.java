package com.springjwt.Bookshelf.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springjwt.Bookshelf.model.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Registration findByUsername(String username);
}
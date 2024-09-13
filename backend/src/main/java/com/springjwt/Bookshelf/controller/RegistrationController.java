package com.springjwt.Bookshelf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springjwt.Bookshelf.model.Registration;
import com.springjwt.Bookshelf.service.RegistrationService;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<Registration> createUser(@RequestBody Registration registration) {
        Registration savedRegistration = registrationService.registerUser(registration);
        return ResponseEntity.ok(savedRegistration);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getUserById(@PathVariable Long id) {
        Optional<Registration> registration = registrationService.getUserById(id);
        return registration.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Registration> getAllUsers() {
        return registrationService.getAllUsers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Registration> updateUser(@PathVariable Long id, @RequestBody Registration registration) {
        Registration updatedRegistration = registrationService.updateUser(id, registration);
        return ResponseEntity.ok(updatedRegistration);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        registrationService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

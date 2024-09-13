package com.springjwt.Bookshelf.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.springjwt.Bookshelf.model.Registration;
import com.springjwt.Bookshelf.repository.RegistrationRepository;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Method to register a new user
    public Registration registerUser(Registration registration) {
        // Hash the user's password before saving
        String encodedPassword = passwordEncoder.encode(registration.getPassword());
        registration.setPassword(encodedPassword);
        return registrationRepository.save(registration);
    }

    // Method to find a user by ID
    public Optional<Registration> getUserById(Long id) {
        return registrationRepository.findById(id);
    }

    // Method to get all users
    public List<Registration> getAllUsers() {
        return registrationRepository.findAll();
    }

    // Method to update user details
    public Registration updateUser(Long id, Registration updatedRegistration) {
        return registrationRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(updatedRegistration.getUsername());
                    existingUser.setEmail(updatedRegistration.getEmail());
                    // Hash the password again if it has been updated
                    if (!existingUser.getPassword().equals(updatedRegistration.getPassword())) {
                        existingUser.setPassword(passwordEncoder.encode(updatedRegistration.getPassword()));
                    }
                    return registrationRepository.save(existingUser);
                })
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    // Method to delete a user by ID
    public void deleteUser(Long id) {
        registrationRepository.deleteById(id);
    }
}

package com.springjwt.Bookshelf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/register")
    public Registration registerUser(@RequestBody Registration registration) {
        return registrationService.registerUser(registration);
    }

    @GetMapping("/all")
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }
}

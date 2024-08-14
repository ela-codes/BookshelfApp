package com.springjwt.Bookshelf;


import com.springjwt.Bookshelf.controller.RegistrationController;
import com.springjwt.Bookshelf.model.Registration;
import com.springjwt.Bookshelf.service.RegistrationService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class RegistrationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private RegistrationService registrationService;

    @InjectMocks
    private RegistrationController registrationController;

    @Test
    public void testRegisterUser() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();

        Registration registration = new Registration();
        registration.setUsername("testuser");
        registration.setPassword("password");
        registration.setEmail("test@example.com");

        when(registrationService.registerUser(registration)).thenReturn(registration);

        mockMvc.perform(post("/api/registrations/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser\",\"password\":\"password\",\"email\":\"test@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(content().json("{'username':'testuser','password':'password','email':'test@example.com'}"));
    }

    @Test
    public void testGetAllRegistrations() throws Exception {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();

        when(registrationService.getAllRegistrations()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/registrations/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}


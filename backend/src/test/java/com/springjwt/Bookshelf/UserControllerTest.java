package com.springjwt.Bookshelf;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.springjwt.Bookshelf.controller.UserController;
import com.springjwt.Bookshelf.model.Registration;
import com.springjwt.Bookshelf.service.RegistrationService;

public class UserControllerTest {

    @Mock
    private RegistrationService registrationService;

    @InjectMocks
    private UserController registrationController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(registrationController).build();
    }

    @Test
    public void testCreateUser() throws Exception {
        Registration registration = new Registration();
        registration.setUsername("testuser");
        registration.setPassword("testpassword");

        when(registrationService.registerUser(any(Registration.class))).thenReturn(registration);

        mockMvc.perform(post("/api/registrations")
                        .contentType("application/json")
                        .content("{\"username\":\"testuser\",\"password\":\"testpassword\"}"))
                .andExpect(status().isOk());

        verify(registrationService, times(1)).registerUser(any(Registration.class));
    }

    @Test
    public void testGetUserById() throws Exception {
        Registration registration = new Registration();
        registration.setId(1L);
        registration.setUsername("testuser");
        registration.setPassword("testpassword");

        when(registrationService.getUserById(1L)).thenReturn(Optional.of(registration));

        mockMvc.perform(get("/api/registrations/1"))
                .andExpect(status().isOk());

        verify(registrationService, times(1)).getUserById(1L);
    }

    @Test
    public void testGetAllUsers() throws Exception {
        List<Registration> registrations = new ArrayList<>();
        Registration registration1 = new Registration();
        registration1.setUsername("testuser1");
        registration1.setPassword("testpassword1");

        Registration registration2 = new Registration();
        registration2.setUsername("testuser2");
        registration2.setPassword("testpassword2");

        registrations.add(registration1);
        registrations.add(registration2);

        when(registrationService.getAllUsers()).thenReturn(registrations);

        mockMvc.perform(get("/api/registrations"))
                .andExpect(status().isOk());

        verify(registrationService, times(1)).getAllUsers();
    }

    @Test
    public void testUpdateUser() throws Exception {
        Registration registration = new Registration();
        registration.setId(1L);
        registration.setUsername("updateduser");
        registration.setPassword("updatedpassword");

        when(registrationService.updateUser(eq(1L), any(Registration.class))).thenReturn(registration);

        mockMvc.perform(put("/api/registrations/1")
                        .contentType("application/json")
                        .content("{\"username\":\"updateduser\",\"password\":\"updatedpassword\"}"))
                .andExpect(status().isOk());

        verify(registrationService, times(1)).updateUser(eq(1L), any(Registration.class));
    }

    @Test
    public void testDeleteUser() throws Exception {
        doNothing().when(registrationService).deleteUser(1L);

        mockMvc.perform(delete("/api/registrations/1"))
                .andExpect(status().isNoContent());

        verify(registrationService, times(1)).deleteUser(1L);
    }
}

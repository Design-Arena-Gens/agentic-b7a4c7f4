package com.sweetbite.sweetbite.controller;

import com.sweetbite.sweetbite.dto.UserResponse;
import com.sweetbite.sweetbite.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponse> allUsers() {
        return userService.getAllUsers();
    }
}

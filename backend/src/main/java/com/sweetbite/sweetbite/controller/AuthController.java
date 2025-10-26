package com.sweetbite.sweetbite.controller;

import com.sweetbite.sweetbite.dto.AuthRequest;
import com.sweetbite.sweetbite.dto.AuthResponse;
import com.sweetbite.sweetbite.dto.RegisterRequest;
import com.sweetbite.sweetbite.dto.UserResponse;
import com.sweetbite.sweetbite.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse me(@RequestHeader("Authorization") String token) {
        return authService.authenticate(token);
    }
}

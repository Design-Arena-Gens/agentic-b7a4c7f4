package com.sweetbite.sweetbite.service;

import com.sweetbite.sweetbite.dto.AuthRequest;
import com.sweetbite.sweetbite.dto.AuthResponse;
import com.sweetbite.sweetbite.dto.RegisterRequest;
import com.sweetbite.sweetbite.dto.UserResponse;
import com.sweetbite.sweetbite.entity.User;
import com.sweetbite.sweetbite.security.TokenService;
import com.sweetbite.sweetbite.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final TokenService tokenService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(user -> {
            throw new EntityExistsException("Email already registered");
        });
        User user = userService.createCustomer(request.name(), request.email(), request.password());
        String token = tokenService.generateToken(user.getId());
        return new AuthResponse(token, userService.toResponse(user));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new EntityNotFoundException("Invalid credentials"));
        if (!userService.matchesPassword(request.password(), user.getPassword())) {
            throw new EntityNotFoundException("Invalid credentials");
        }
        String token = tokenService.generateToken(user.getId());
        return new AuthResponse(token, userService.toResponse(user));
    }

    @Transactional(readOnly = true)
    public UserResponse authenticate(String token) {
        Long userId = tokenService.getUserIdFromToken(token);
        if (userId == null) {
            throw new EntityNotFoundException("Invalid token");
        }
        return userService.toResponse(userService.getById(userId));
    }
}

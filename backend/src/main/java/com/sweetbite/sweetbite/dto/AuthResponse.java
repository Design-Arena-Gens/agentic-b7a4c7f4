package com.sweetbite.sweetbite.dto;

public record AuthResponse(
        String token,
        UserResponse user
) {
}

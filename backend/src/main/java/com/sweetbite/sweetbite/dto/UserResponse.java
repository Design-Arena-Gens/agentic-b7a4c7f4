package com.sweetbite.sweetbite.dto;

public record UserResponse(
        Long id,
        String name,
        String email,
        String role
) {
}

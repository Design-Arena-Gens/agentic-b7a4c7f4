package com.sweetbite.sweetbite.exception;

import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Map;

public record ApiError(
        Instant timestamp,
        HttpStatus status,
        String message,
        Map<String, String> validationErrors
) {
}

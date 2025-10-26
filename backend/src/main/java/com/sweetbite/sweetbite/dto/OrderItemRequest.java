package com.sweetbite.sweetbite.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull Long cakeId,
        @Min(1) Integer quantity,
        String size,
        String flavor,
        String message
) {
}

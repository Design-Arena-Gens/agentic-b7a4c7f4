package com.sweetbite.sweetbite.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequest(
        @NotNull Long userId,
        @NotNull @Valid List<OrderItemRequest> items,
        @NotBlank String deliveryAddress,
        @NotBlank String contactPhone,
        String specialInstructions,
        @Email String guestEmail,
        String guestName
) {
}

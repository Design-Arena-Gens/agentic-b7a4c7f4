package com.sweetbite.sweetbite.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public record CakeRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @NotBlank String category,
        String imageUrl,
        List<String> sizes,
        List<String> flavors,
        String customizationNotes
) {
}

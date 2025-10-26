package com.sweetbite.sweetbite.dto;

import java.math.BigDecimal;
import java.util.List;

public record CakeResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String category,
        String imageUrl,
        List<String> sizes,
        List<String> flavors,
        String customizationNotes
) {
}

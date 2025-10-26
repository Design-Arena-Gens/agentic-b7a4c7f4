package com.sweetbite.sweetbite.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long cakeId,
        String cakeName,
        Integer quantity,
        String size,
        String flavor,
        String message,
        BigDecimal unitPrice,
        BigDecimal totalPrice
) {
}

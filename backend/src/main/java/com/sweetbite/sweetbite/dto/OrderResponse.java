package com.sweetbite.sweetbite.dto;

import com.sweetbite.sweetbite.entity.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        OrderStatus status,
        BigDecimal totalAmount,
        Instant createdAt,
        Instant updatedAt,
        String deliveryAddress,
        String contactPhone,
        String specialInstructions,
        Long userId,
        String userName,
        String userEmail,
        List<OrderItemResponse> items
) {
}

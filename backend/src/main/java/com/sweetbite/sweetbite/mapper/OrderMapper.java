package com.sweetbite.sweetbite.mapper;

import com.sweetbite.sweetbite.dto.OrderItemResponse;
import com.sweetbite.sweetbite.dto.OrderResponse;
import com.sweetbite.sweetbite.entity.Order;
import com.sweetbite.sweetbite.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {

    public OrderResponse toResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(this::toItemResponse)
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getStatus(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getDeliveryAddress(),
                order.getContactPhone(),
                order.getSpecialInstructions(),
                order.getUser() != null ? order.getUser().getId() : null,
                order.getUser() != null ? order.getUser().getName() : null,
                order.getUser() != null ? order.getUser().getEmail() : null,
                itemResponses
        );
    }

    private OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                item.getCake() != null ? item.getCake().getId() : null,
                item.getCake() != null ? item.getCake().getName() : null,
                item.getQuantity(),
                item.getSize(),
                item.getFlavor(),
                item.getMessage(),
                item.getUnitPrice(),
                item.getTotalPrice()
        );
    }
}

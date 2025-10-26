package com.sweetbite.sweetbite.controller;

import com.sweetbite.sweetbite.dto.OrderRequest;
import com.sweetbite.sweetbite.dto.OrderResponse;
import com.sweetbite.sweetbite.entity.enums.OrderStatus;
import com.sweetbite.sweetbite.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse placeOrder(@Valid @RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }

    @GetMapping("/user/{userId}")
    public List<OrderResponse> getOrdersForUser(@PathVariable Long userId) {
        return orderService.getOrdersForUser(userId);
    }

    @GetMapping("/{orderId}")
    public OrderResponse getOrder(@PathVariable Long orderId) {
        return orderService.getOrder(orderId);
    }

    @PatchMapping("/{orderId}/status")
    public OrderResponse updateStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        return orderService.updateStatus(orderId, status);
    }

    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }
}

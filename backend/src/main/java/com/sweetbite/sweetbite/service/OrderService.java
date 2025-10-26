package com.sweetbite.sweetbite.service;

import com.sweetbite.sweetbite.dto.OrderItemRequest;
import com.sweetbite.sweetbite.dto.OrderRequest;
import com.sweetbite.sweetbite.dto.OrderResponse;
import com.sweetbite.sweetbite.entity.Cake;
import com.sweetbite.sweetbite.entity.Order;
import com.sweetbite.sweetbite.entity.OrderItem;
import com.sweetbite.sweetbite.entity.User;
import com.sweetbite.sweetbite.entity.enums.OrderStatus;
import com.sweetbite.sweetbite.mapper.OrderMapper;
import com.sweetbite.sweetbite.repository.CakeRepository;
import com.sweetbite.sweetbite.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CakeRepository cakeRepository;
    private final UserService userService;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = userService.getById(request.userId());

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .deliveryAddress(request.deliveryAddress())
                .contactPhone(request.contactPhone())
                .specialInstructions(request.specialInstructions())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = request.items().stream()
                .map(itemRequest -> buildOrderItem(order, itemRequest))
                .toList();

        for (OrderItem item : items) {
            total = total.add(item.getTotalPrice());
        }

        order.setItems(items);
        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);
        return orderMapper.toResponse(saved);
    }

    private OrderItem buildOrderItem(Order order, OrderItemRequest request) {
        Cake cake = cakeRepository.findById(request.cakeId())
                .orElseThrow(() -> new EntityNotFoundException("Cake not found"));
        BigDecimal quantity = BigDecimal.valueOf(request.quantity());
        BigDecimal unitPrice = cake.getPrice();
        BigDecimal total = unitPrice.multiply(quantity);

        return OrderItem.builder()
                .order(order)
                .cake(cake)
                .quantity(request.quantity())
                .size(request.size())
                .flavor(request.flavor())
                .message(request.message())
                .unitPrice(unitPrice)
                .totalPrice(total)
                .build();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersForUser(Long userId) {
        User user = userService.getById(userId);
        return orderRepository.findByUser(user).stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Transactional
    public OrderResponse updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setStatus(status);
        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return orderMapper.toResponse(order);
    }
}

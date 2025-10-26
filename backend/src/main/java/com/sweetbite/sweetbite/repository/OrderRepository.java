package com.sweetbite.sweetbite.repository;

import com.sweetbite.sweetbite.entity.Order;
import com.sweetbite.sweetbite.entity.User;
import com.sweetbite.sweetbite.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(OrderStatus status);
}

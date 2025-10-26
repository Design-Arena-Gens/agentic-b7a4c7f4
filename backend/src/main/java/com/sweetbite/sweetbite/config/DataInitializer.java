package com.sweetbite.sweetbite.config;

import com.sweetbite.sweetbite.entity.Cake;
import com.sweetbite.sweetbite.repository.CakeRepository;
import com.sweetbite.sweetbite.repository.UserRepository;
import com.sweetbite.sweetbite.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final CakeRepository cakeRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Bean
    CommandLineRunner loadData() {
        return args -> {
            if (cakeRepository.count() == 0) {
                cakeRepository.save(
                        Cake.builder()
                                .name("Velvet Dream")
                                .description("Classic red velvet cake with cream cheese frosting.")
                                .price(new BigDecimal("29.99"))
                                .category("Signature")
                                .imageUrl("https://images.unsplash.com/photo-1608198093002-ad4e005484ec")
                                .sizes(new java.util.ArrayList<>(List.of("6 inch", "8 inch", "10 inch")))
                                .flavors(new java.util.ArrayList<>(List.of("Red Velvet", "Chocolate")))
                                .customizationNotes("Add a personalized message up to 30 characters.")
                                .build()
                );

                cakeRepository.save(
                        Cake.builder()
                                .name("Tropical Bliss")
                                .description("Layers of pineapple and coconut with mango buttercream.")
                                .price(new BigDecimal("34.99"))
                                .category("Seasonal")
                                .imageUrl("https://images.unsplash.com/photo-1542826438-068127a5f9f4")
                                .sizes(new java.util.ArrayList<>(List.of("6 inch", "8 inch")))
                                .flavors(new java.util.ArrayList<>(List.of("Vanilla", "Coconut")))
                                .customizationNotes("Perfect for summer celebrations.")
                                .build()
                );
            }

            userRepository.findByEmail("admin@sweetbite.com").orElseGet(() ->
                    userService.createAdmin("SweetBite Admin", "admin@sweetbite.com", "admin123"));
        };
    }
}

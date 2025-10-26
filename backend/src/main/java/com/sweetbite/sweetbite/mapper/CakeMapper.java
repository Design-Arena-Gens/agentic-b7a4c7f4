package com.sweetbite.sweetbite.mapper;

import com.sweetbite.sweetbite.dto.CakeRequest;
import com.sweetbite.sweetbite.dto.CakeResponse;
import com.sweetbite.sweetbite.entity.Cake;
import org.springframework.stereotype.Component;

@Component
public class CakeMapper {

    public Cake toEntity(CakeRequest request) {
        return Cake.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .category(request.category())
                .imageUrl(request.imageUrl())
                .sizes(request.sizes())
                .flavors(request.flavors())
                .customizationNotes(request.customizationNotes())
                .build();
    }

    public void updateEntity(Cake cake, CakeRequest request) {
        cake.setName(request.name());
        cake.setDescription(request.description());
        cake.setPrice(request.price());
        cake.setCategory(request.category());
        cake.setImageUrl(request.imageUrl());
        cake.setSizes(request.sizes());
        cake.setFlavors(request.flavors());
        cake.setCustomizationNotes(request.customizationNotes());
    }

    public CakeResponse toResponse(Cake cake) {
        return new CakeResponse(
                cake.getId(),
                cake.getName(),
                cake.getDescription(),
                cake.getPrice(),
                cake.getCategory(),
                cake.getImageUrl(),
                cake.getSizes(),
                cake.getFlavors(),
                cake.getCustomizationNotes()
        );
    }
}

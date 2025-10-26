package com.sweetbite.sweetbite.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cakes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;

    @ElementCollection
    private List<String> sizes = new ArrayList<>();

    @ElementCollection
    private List<String> flavors = new ArrayList<>();

    @Lob
    private String customizationNotes;
}

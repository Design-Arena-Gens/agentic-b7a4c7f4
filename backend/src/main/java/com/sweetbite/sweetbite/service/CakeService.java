package com.sweetbite.sweetbite.service;

import com.sweetbite.sweetbite.dto.CakeRequest;
import com.sweetbite.sweetbite.dto.CakeResponse;
import com.sweetbite.sweetbite.entity.Cake;
import com.sweetbite.sweetbite.mapper.CakeMapper;
import com.sweetbite.sweetbite.repository.CakeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CakeService {

    private final CakeRepository cakeRepository;
    private final CakeMapper cakeMapper;

    @Transactional(readOnly = true)
    public List<CakeResponse> getAllCakes() {
        return cakeRepository.findAll()
                .stream()
                .map(cakeMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CakeResponse getCake(Long id) {
        return cakeRepository.findById(id)
                .map(cakeMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Cake not found"));
    }

    @Transactional
    public CakeResponse createCake(CakeRequest request) {
        Cake cake = cakeMapper.toEntity(request);
        return cakeMapper.toResponse(cakeRepository.save(cake));
    }

    @Transactional
    public CakeResponse updateCake(Long id, CakeRequest request) {
        Cake cake = cakeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cake not found"));
        cakeMapper.updateEntity(cake, request);
        return cakeMapper.toResponse(cakeRepository.save(cake));
    }

    @Transactional
    public void deleteCake(Long id) {
        if (!cakeRepository.existsById(id)) {
            throw new EntityNotFoundException("Cake not found");
        }
        cakeRepository.deleteById(id);
    }
}

package com.sweetbite.sweetbite.controller;

import com.sweetbite.sweetbite.dto.CakeRequest;
import com.sweetbite.sweetbite.dto.CakeResponse;
import com.sweetbite.sweetbite.service.CakeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cakes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CakeController {

    private final CakeService cakeService;

    @GetMapping
    public List<CakeResponse> getCakes() {
        return cakeService.getAllCakes();
    }

    @GetMapping("/{id}")
    public CakeResponse getCake(@PathVariable Long id) {
        return cakeService.getCake(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CakeResponse createCake(@Valid @RequestBody CakeRequest request) {
        return cakeService.createCake(request);
    }

    @PutMapping("/{id}")
    public CakeResponse updateCake(@PathVariable Long id, @Valid @RequestBody CakeRequest request) {
        return cakeService.updateCake(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCake(@PathVariable Long id) {
        cakeService.deleteCake(id);
    }
}

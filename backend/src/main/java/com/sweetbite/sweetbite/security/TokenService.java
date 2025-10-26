package com.sweetbite.sweetbite.security;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenService {

    private final Map<String, Long> tokenStore = new ConcurrentHashMap<>();

    public String generateToken(Long userId) {
        String token = UUID.randomUUID().toString();
        tokenStore.put(token, userId);
        return token;
    }

    public Long getUserIdFromToken(String token) {
        return tokenStore.get(token);
    }

    public void revokeToken(String token) {
        tokenStore.remove(token);
    }
}

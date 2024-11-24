package com.webpaint.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@RestController
public class HealthCheckController {

    @GetMapping("/health")
    public Map<String, Boolean> healthCheck() {
        return Map.of("health", true);
    }
}

package com.webpaint.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration // Marks this class as a Spring configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // prefix for messages sent from the server to the client.
        // Enable a simple in-memory message broker.
        config.enableSimpleBroker("/topic");
        // Prefix for messages sent from the client to the server.
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                // Allow cross-origin requests from the specified origin
                .setAllowedOriginPatterns("http://localhost:3333")
                // Enable SockJS fallback for browsers that don't support WebSocket
                .withSockJS();
    }
}

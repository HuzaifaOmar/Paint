package com.example.paint_backend.config;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.factory.ShapeFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {
    @Bean
    public ShapeFactory shapeFactory() {
        return new ShapeFactory();
    }

    @Bean
    public CommandHistory commandHistory() {
        return new CommandHistory();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all endpoints starting with /api/
                .allowedOrigins("http://localhost:3000") // Allow requests from localhost:3000 (your frontend)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, HTTP authentication)
    }
}
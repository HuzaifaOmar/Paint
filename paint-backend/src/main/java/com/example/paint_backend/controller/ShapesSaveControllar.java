package com.example.paint_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.paint_backend.service.ShapesSavingService;

@RestController
@RequestMapping("/api/shapes/save")
public class ShapesSaveControllar {

    private ShapesSavingService shapesSavingService;

    public ShapesSaveControllar(ShapesSavingService shapesSavingService) {
        this.shapesSavingService = shapesSavingService;
    }

    @GetMapping()
    public String getShapeDTOsAsJson() {
        shapesSavingService.createShapeDTOs();
        return shapesSavingService.getShapeDTOsAsJsonAndXml();
    }
}

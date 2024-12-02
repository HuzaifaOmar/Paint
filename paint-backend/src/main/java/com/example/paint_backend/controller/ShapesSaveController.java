package com.example.paint_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.service.ShapesSavingService;


@RestController
@RequestMapping("/api/shapes/save")
public class ShapesSaveController {

    private final ShapesSavingService shapesSavingService;

    public ShapesSaveController(ShapesSavingService shapesSavingService) {
        this.shapesSavingService = shapesSavingService;
    }

    @GetMapping()
    public String getShapeDTOsAsJson() {
        shapesSavingService.createShapeDTOs();
        return shapesSavingService.getShapeDTOsAsJsonAndXml();
    }
    @PostMapping("/load/json")
    public String loadJson(@RequestBody List<ShapeDTO> entity) {
        try {
            System.out.println("Loading JSON file: " + entity);
            shapesSavingService.loadJson(entity);
            System.out.println("JSON loaded :))");
            return "JSON loaded";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error loading JSON: " + e.getMessage();
        }
    }
    
    
   

@PostMapping(value = "/load/xml", consumes = "application/xml")
public List<ShapeDTO> loadXml(@RequestBody List<ShapeDTO> entity) {
    try {
        System.out.println("Loading XML file: " + entity);
        shapesSavingService.loadJson(entity); // Reuse the same service
        System.out.println("XML loaded :))");
        
        return entity;
    } catch (Exception e) {
        e.printStackTrace();
        return null;
    }
}

    
}

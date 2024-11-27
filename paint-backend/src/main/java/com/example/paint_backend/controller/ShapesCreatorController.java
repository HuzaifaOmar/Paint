package com.example.paint_backend.controller;

import com.example.paint_backend.dto.*;
import com.example.paint_backend.dto.shape_creation_dto.ShapeFinalizeRequest;
import com.example.paint_backend.dto.shape_creation_dto.ShapeRequest;
import com.example.paint_backend.dto.shape_creation_dto.ShapeUpdateRequest;
import com.example.paint_backend.service.ShapeCreationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shapes/")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ShapesCreatorController {

    private final ShapeCreationService shapeService;

    public ShapesCreatorController(ShapeCreationService shapeService) {
        this.shapeService = shapeService;
    }

    @PostMapping("/create")
    public ResponseEntity<ShapeDTO> createShape(@RequestBody ShapeRequest shapeRequest) {
        System.out.println("Received shape creation request: " + shapeRequest);
        ShapeDTO createdShape = shapeService.createShape(shapeRequest);
        return ResponseEntity.ok(createdShape);
    }

    @PutMapping("/{shapeId}")
    public ResponseEntity<ShapeDTO> updateShape(
            @PathVariable Long shapeId,
            @RequestBody ShapeUpdateRequest request) {
        System.out.println("Received shape update request for ID: " + shapeId);
        ShapeDTO updatedShape = shapeService.updateShape(shapeId, request);
        return ResponseEntity.ok(updatedShape);
    }

    @PutMapping("/{shapeId}/finalize")
    public ResponseEntity<ShapeDTO> finalizeShape(
            @PathVariable Long shapeId,
            @RequestBody ShapeFinalizeRequest request) {
        System.out.println("Received shape finalization request for ID: " + shapeId);
        ShapeDTO finalizedShape = shapeService.finalizeShape(shapeId, request);
        return ResponseEntity.ok(finalizedShape);
    }

}

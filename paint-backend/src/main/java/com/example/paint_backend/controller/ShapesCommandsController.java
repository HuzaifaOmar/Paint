package com.example.paint_backend.controller;

import com.example.paint_backend.dto.*;
import com.example.paint_backend.service.ShapeCommandsService;
import com.example.paint_backend.service.ShapeCreationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shapes/")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ShapesCommandsController {

    private final ShapeCommandsService shapeService;

    public ShapesCommandsController(ShapeCommandsService shapeService) {
        this.shapeService = shapeService;
    }

    @PutMapping("{shapeId}/move")
    public ResponseEntity<ShapeDTO> moveShape(@PathVariable Long shapeId, @RequestBody MoveRequest request) {
        System.out.println("Received move request for shape ID: " + shapeId);
        ShapeDTO movedShape = shapeService.moveShape(shapeId, request);
        return ResponseEntity.ok(movedShape);
    }
}

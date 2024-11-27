package com.example.paint_backend.service;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.dto.*;
import com.example.paint_backend.dto.shape_creation_dto.ShapeRequest;
import com.example.paint_backend.exception.*;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;
import org.springframework.stereotype.Service;

@Service
public class ShapeCommandsService {

    private final ShapeRepository shapeRepository;
    private final CommandHistory commandHistory;

    public ShapeCommandsService(ShapeRepository shapeRepository, CommandHistory commandHistory) {
        this.shapeRepository = shapeRepository;
        this.commandHistory = commandHistory;
    }

    public ShapeDTO moveShape(Long shapeId, MoveRequest request) {
        Shape shape = findShapeById(shapeId);
        shape.setStartPoints(request.getXStart(), request.getYStart());
        return new ShapeDTO(shapeRepository.save(shape));
    }

    private Shape findShapeById(Long shapeId) {
        return shapeRepository.findById(shapeId).orElseThrow(() -> new ShapeNotFoundException(shapeId));
    }

    private void validateShapeRequest(ShapeRequest request) {
        if (request.getShapeType() == null || request.getShapeType().isEmpty()) {
            throw new InvalidShapeTypeException("Shape type is required");
        }
    }
}
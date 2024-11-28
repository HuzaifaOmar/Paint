package com.example.paint_backend.service;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.commands.implementation.CreateShapeCommand;
import com.example.paint_backend.dto.*;
import com.example.paint_backend.dto.shape_creation_request.ShapeFinalizeRequest;
import com.example.paint_backend.dto.shape_creation_request.ShapeRequest;
import com.example.paint_backend.dto.shape_creation_request.ShapeUpdateRequest;
import com.example.paint_backend.exception.*;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.factory.ShapeFactory;
import com.example.paint_backend.shapes.Shape;
import org.springframework.stereotype.Service;

@Service
public class ShapeCreationService {

    private final ShapeRepository shapeRepository;
    private final ShapeFactory shapeFactory;
    private final CommandHistory commandHistory;

    public ShapeCreationService(ShapeRepository shapeRepository, ShapeFactory shapeFactory, CommandHistory commandHistory) {
        this.shapeRepository = shapeRepository;
        this.shapeFactory = shapeFactory;
        this.commandHistory = commandHistory;
    }

    public ShapeDTO createShape(ShapeRequest shapeRequest) {
        validateShapeRequest(shapeRequest);
        Shape shape = shapeFactory.getShape(shapeRequest.getShapeType(), shapeRequest.getAttributes());
        shape.dimensionCalculate();
        return new ShapeDTO(shapeRepository.save(shape));
    }

    public ShapeDTO updateShape(Long shapeId, ShapeUpdateRequest request) {
        Shape shape = findShapeById(shapeId);
        shape.setEndPoints(request.getXEnd(), request.getYEnd());
        shape.dimensionCalculate();
        return new ShapeDTO(shapeRepository.save(shape));
    }

    public ShapeDTO finalizeShape(Long shapeId, ShapeFinalizeRequest request) {
        Shape shape = findShapeById(shapeId);
        String fillColor = request.getFillColor();
        String strokeColor = request.getStrokeColor();
        ShapeCommand createShape = new CreateShapeCommand(shapeRepository, shape, fillColor, strokeColor);
        createShape.execute();
        commandHistory.push(createShape);
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
package com.example.paint_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.commands.implementation.CreateShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.shape_creation_request.ShapeFinalizeRequest;
import com.example.paint_backend.dto.shape_creation_request.ShapeRequest;
import com.example.paint_backend.dto.shape_creation_request.ShapeUpdateRequest;
import com.example.paint_backend.exception.InvalidShapeTypeException;
import com.example.paint_backend.exception.ShapeNotFoundException;
import com.example.paint_backend.factory.ShapeFactory;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

@Service
@RequiredArgsConstructor
public class ShapeCreationService {

    private final ShapeRepository shapeRepository;
    private final ShapeFactory shapeFactory;
    private final CommandHistory commandHistory;

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
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public ShapeDTO finalizeShape(Long shapeId, ShapeFinalizeRequest request) {
        Shape shape = findShapeById(shapeId);
        shape.setFillColor(request.getFillColor());
        shape.setStrokeColor(request.getStrokeColor());
        ShapeCommand createShape = new CreateShapeCommand(shapeRepository, shape);
        createShape.execute();
        commandHistory.push(createShape);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
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

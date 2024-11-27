package com.example.paint_backend.exception;

public class ShapeNotFoundException extends RuntimeException {
    private final Long shapeId;

    public ShapeNotFoundException(Long shapeId) {
        super("Shape not found with ID: " + shapeId);
        this.shapeId = shapeId;
    }

    public Long getShapeId() {
        return shapeId;
    }
}

package com.example.paint_backend.exception;

public class ShapeNotFoundException extends RuntimeException {
    private final int shapeId;

    public ShapeNotFoundException(int shapeId) {
        super("Shape not found with ID: " + shapeId);
        this.shapeId = shapeId;
    }

    public int getShapeId() {
        return shapeId;
    }
}

package com.example.paint_backend.dto;

import com.example.paint_backend.shapes.Shape;

import java.util.Map;

public class ShapeDTO {
    private Long shapeId;
    private String shapeType;
    private Map<String, Object> attributes;

    // Constructor to convert from Shape entity
    public ShapeDTO(Shape shape) {
        this.shapeId = shape.getShapeId();
        this.shapeType = shape.getShapeType();
        this.attributes = shape.getAttributes();
    }

    // Getters and setters
    public Long getShapeId() {
        return shapeId;
    }

    public void setShapeId(Long shapeId) {
        this.shapeId = shapeId;
    }

    public String getShapeType() {
        return shapeType;
    }

    public void setShapeType(String shapeType) {
        this.shapeType = shapeType;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
}

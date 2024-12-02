package com.example.paint_backend.dto;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
public class ShapeDTO {
    // Getters and setters
    private Long shapeId;
    private String shapeType;
    private Map<String, Object> attributes;

    // Constructor to convert from Shape entity
    public ShapeDTO(Shape shape) {
        this.shapeId = shape.getShapeId();
        this.shapeType = shape.getShapeType();
        this.attributes = shape.getAttributes();
    }
}

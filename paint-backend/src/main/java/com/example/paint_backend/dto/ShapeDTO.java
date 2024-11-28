package com.example.paint_backend.dto;

import com.example.paint_backend.shapes.Shape;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
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

package com.example.paint_backend.dto;

import java.util.Map;

public class ShapeRequest {
    private String shapeType;
    // private int shapeId;
    private Map<String, Object> attributes; // * Shape-specific attributes

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

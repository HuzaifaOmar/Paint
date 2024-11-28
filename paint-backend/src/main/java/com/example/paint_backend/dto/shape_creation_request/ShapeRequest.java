package com.example.paint_backend.dto.shape_creation_request;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class ShapeRequest {
    private String shapeType;
    private Map<String, Object> attributes; // * Shape-specific attributes
}

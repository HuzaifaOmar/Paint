package com.example.paint_backend.factory;

import com.example.paint_backend.exception.InvalidShapeTypeException;
import com.example.paint_backend.shapes.*;
import com.example.paint_backend.shapes.implementation.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service

public class ShapeFactory {

    public Shape getShape(String shapeType, int shapeId, Map<String, Object> attributes) {
        return switch (shapeType.toLowerCase()) {
            case "circle" -> new Circle(shapeId, attributes);
            case "rectangle" -> new Rectangle(shapeId, attributes);
            case "square" -> new Square(shapeId, attributes);
            case "ellipse" -> new Ellipse(shapeId, attributes);
            case "line" -> new Line(shapeId, attributes);
            case "triangle" -> new Triangle(shapeId, attributes);
            default -> throw new InvalidShapeTypeException("invalid shape type");
        };
    }
}



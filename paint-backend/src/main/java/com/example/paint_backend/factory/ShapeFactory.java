package com.example.paint_backend.factory;

import com.example.paint_backend.exception.InvalidShapeTypeException;
import com.example.paint_backend.shapes.*;
import com.example.paint_backend.shapes.implementation.*;

import org.springframework.stereotype.Service;
import com.example.paint_backend.dto.ShapeDTO;

import java.util.Map;

@Service

public class ShapeFactory {

    public Shape getShape(String shapeType, Map<String, Object> attributes) {
        return switch (shapeType.toLowerCase()) {
            case "circle" -> new Circle(attributes);
            case "rectangle" -> new Rectangle(attributes);
            case "square" -> new Square(attributes);
            case "ellipse" -> new Ellipse(attributes);
            case "line" -> new Line(attributes);
            case "triangle" -> new Triangle(attributes);
            case "freehand" -> new FreeHandLine(attributes);
            default -> throw new InvalidShapeTypeException("invalid shape type");
        };
    }
   public Shape getShapeByDTO(ShapeDTO shapeDTO) {
    return switch (shapeDTO.getShapeType().toLowerCase()) {
        case "circle" -> new Circle(shapeDTO);
        case "rectangle" -> new Rectangle(shapeDTO);
        case "square" -> new Square(shapeDTO);
        case "ellipse" -> new Ellipse(shapeDTO);
        case "line" -> new Line(shapeDTO);
        case "triangle" -> new Triangle(shapeDTO);
        case "freehand" -> new FreeHandLine(shapeDTO);
        default -> throw new InvalidShapeTypeException("invalid shape type");
    };
   }
}



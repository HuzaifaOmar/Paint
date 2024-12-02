package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Circle extends Shape {
    private Double radius;

    public Circle(Map<String, Object> attributes) {
        super(attributes);
        this.x = xStart;
        this.y = yStart;
    }

    public Circle(ShapeDTO shapeDTO) {
        this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("x", "100.0").toString());
        this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
        this.radius = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("radius", "0.0").toString());
        this.scaleX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleX", "1.0").toString());
        this.scaleY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleY", "1.0").toString());
        this.rotation = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("rotation", "0.0").toString());
        this.fillColor = (String) shapeDTO.getAttributes().getOrDefault("fill", "black");
        this.strokeColor = (String) shapeDTO.getAttributes().getOrDefault("stroke", "black");
        this.strokeWidth = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("strokeWidth", "1.0").toString());
        this.shapeId = shapeDTO.getShapeId();
    }

    @Override
    public void dimensionCalculate() {
        this.radius = Math.sqrt((xStart - xEnd) * (xStart - xEnd) + (yStart - yEnd) * (yStart - yEnd));
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "circle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "x", x,
                "y", y,
                "radius", radius,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }

    @Override
    public Shape clone() {
        Circle clone = new Circle();
        clone.x = this.x + 10;
        clone.y = this.y + 10;
        clone.radius = this.radius;
        clone.scaleX = this.scaleX;
        clone.scaleY = this.scaleY;
        clone.rotation = this.rotation;
        clone.fillColor = this.fillColor;
        clone.strokeColor = this.strokeColor;
        clone.strokeWidth = this.strokeWidth;
        return clone;
    }
}
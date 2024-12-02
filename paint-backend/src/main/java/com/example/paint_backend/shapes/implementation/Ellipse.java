package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Ellipse extends Shape {
    private Double radiusX;
    private Double radiusY;

    public Ellipse(Map<String, Object> attributes) {
        super(attributes);
        this.x = xStart;
        this.y = yStart;
    }

    public Ellipse(ShapeDTO shapeDTO) {
        this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("x", "100.0").toString());
        this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
        this.radiusX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("radiusX", "0.0").toString());
        this.radiusY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("radiusY", "0.0").toString());
        this.scaleX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleX", "1.0").toString());
        this.scaleY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleY", "1.0").toString());
        this.rotation = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("rotation", "0.0").toString());
        this.fillColor = (String) shapeDTO.getAttributes().getOrDefault("fill", "black");
        this.strokeColor = (String) shapeDTO.getAttributes().getOrDefault("stroke", "black");
        this.strokeWidth = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("strokeWidth", "1.0").toString());
        this.shapeId = (Long) Long.parseLong(shapeDTO.getShapeId().toString());
    }

    @Override
    public void dimensionCalculate() {
        this.radiusX = Math.abs(xEnd - xStart);
        this.radiusY = Math.abs(yEnd - yStart);
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "ellipse";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "radiusX", radiusX,
                "radiusY", radiusY,
                "x", x,
                "y", y,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }

    @Override
    public Shape clone() {
        Ellipse clone = new Ellipse();
        clone.x = this.x + 10;
        clone.y = this.y + 10;
        clone.radiusX = this.radiusX;
        clone.radiusY = this.radiusY;
        clone.scaleX = this.scaleX;
        clone.scaleY = this.scaleY;
        clone.rotation = this.rotation;
        clone.fillColor = this.fillColor;
        clone.strokeColor = this.strokeColor;
        clone.strokeWidth = this.strokeWidth;
        return clone;
    }
}
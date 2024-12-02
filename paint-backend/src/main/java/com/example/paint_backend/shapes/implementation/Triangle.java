package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Triangle extends Shape {
    private List<Double> points;

    public Triangle(Map<String, Object> attributes) {
        super(attributes);
    }
    public Triangle(ShapeDTO shapeDTO) {
       this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault ("x", "100.0").toString() );            
       this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
       this.points = (List<Double>) shapeDTO.getAttributes().getOrDefault("points", new ArrayList<>());
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
        points = new ArrayList<>();
        points.add(this.xStart);
        points.add(this.yStart);
        if (this.xEnd == null || this.yEnd == null) return;
        points.add(this.xEnd);
        points.add(this.yStart);
        points.add((this.xEnd + this.xStart) / 2);
        points.add(this.yEnd);
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "triangle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new java.util.HashMap<>(Map.of(
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "points", points,
                "fill", this.fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth
        ));

        if (x != null) {
            attributes.put("x", x);
        }
        if (y != null) {
            attributes.put("y", y);
        }
        return attributes;
    }

    @Override
    public Shape clone() {
        Triangle clone = new Triangle();
        clone.points = new ArrayList<>(this.points);
        clone.x = this.x != null ? this.x + 10 : null;
        clone.y = this.y != null ? this.y + 10 : null;
        clone.scaleX = this.scaleX;
        clone.scaleY = this.scaleY;
        clone.rotation = this.rotation;
        clone.fillColor = this.fillColor;
        clone.strokeColor = this.strokeColor;
        clone.strokeWidth = this.strokeWidth;
        return clone;
    }
}
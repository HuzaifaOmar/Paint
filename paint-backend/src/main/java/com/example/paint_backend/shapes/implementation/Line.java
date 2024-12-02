package com.example.paint_backend.shapes.implementation;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Line extends Shape {

    public Line(Map<String, Object> attributes) {
        super(attributes);
    }
    public Line(ShapeDTO shapeDTO) {
       this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault ("x", "100.0").toString() );                        
       this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
       this.scaleX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleX", "1.0").toString());
       this.scaleY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleY", "1.0").toString());
       this.rotation = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("rotation", "0.0").toString());
       this.strokeColor = (String) shapeDTO.getAttributes().getOrDefault("stroke", "black");
       this.strokeWidth = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("strokeWidth", "1.0").toString());
        this.shapeId = (Long) Long.parseLong(shapeDTO.getShapeId().toString());
    }

    @Override
    public void dimensionCalculate() {
        // No specific dimension calculation for line
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "line";
    }

    @Override
    public Map<String, Object> getAttributes() {
        List<Double> points = Stream
                .of(this.xStart, this.yStart,
                        this.xEnd == null ? this.xStart : this.xEnd,
                        this.yEnd == null ? this.yStart : yEnd)
                .toList();

        Map<String, Object> attributes = new java.util.HashMap<>(Map.of(
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth));

        if (this.x != null) {
            attributes.put("x", this.x);
        }
        if (this.y != null) {
            attributes.put("y", this.y);
        }
        return attributes;
    }

    @Override
    public Shape clone() {
        Line clone = new Line();
        clone.xStart = this.xStart;
        clone.yStart = this.yStart;
        clone.xEnd = this.xEnd;
        clone.yEnd = this.yEnd;
        clone.x = this.x != null ? this.x + 10 : null;
        clone.y = this.y != null ? this.y + 10 : null;
        clone.scaleX = this.scaleX;
        clone.scaleY = this.scaleY;
        clone.rotation = this.rotation;
        clone.strokeColor = this.strokeColor;
        clone.strokeWidth = this.strokeWidth;
        return clone;
    }
}
package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FreeHandLine extends Shape {
    private List<Double> points;

    public FreeHandLine(Map<String, Object> attributes) {
        super(attributes);
        this.points = new ArrayList<>(
                List.of(xStart, yStart));
    }
    public FreeHandLine(ShapeDTO shapeDTO) {
       this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault ("x", "100.0").toString() );
       this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
       this.points = (List<Double>) shapeDTO.getAttributes().getOrDefault("points", new ArrayList<>());
       this.scaleX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleX", "1.0").toString());
       this.scaleY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleY", "1.0").toString());
       this.rotation = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("rotation", "0.0").toString());
       this.strokeColor = (String) shapeDTO.getAttributes().getOrDefault("stroke", "black");
       this.strokeWidth = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("strokeWidth", "1.0").toString());
       this.shapeId = (Long) Long.parseLong(shapeDTO.getShapeId().toString());
    }

    @Override
    public void dimensionCalculate() {
    }

    @Override
    public void setEndPoints(Double xEnd, Double yEnd) {
        this.points.add(xEnd);
        this.points.add(yEnd);
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "freehand";
    }

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new java.util.HashMap<>(Map.of(
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth
        ));

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
        FreeHandLine clone = new FreeHandLine();
        clone.points = new ArrayList<>(this.points);
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

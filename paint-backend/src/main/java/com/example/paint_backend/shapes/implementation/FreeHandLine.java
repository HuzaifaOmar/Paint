package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class FreeHandLine extends Shape {
    private final List<Double> points;
    private Double x;
    private Double y;

    public FreeHandLine(Map<String, Object> attributes) {
        super(attributes);
        this.points = new ArrayList<>(
                List.of(xStart, yStart));
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
    public Double getX() {
        return points.isEmpty() ? 0.0 : points.getFirst();
    }

    @Override
    public Double getY() {
        return points.isEmpty() ? 0.0 : points.get(1);
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
        Shape clone = new FreeHandLine(getAttributes());
        clone.dimensionCalculate();
        clone.transform(x + 5, y + 5, scaleX, scaleY, rotation);
        return clone;
    }
}

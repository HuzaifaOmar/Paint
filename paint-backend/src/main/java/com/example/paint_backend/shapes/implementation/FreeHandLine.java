package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class FreeHandLine extends Shape {
    private final List<Double> points;

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
        Shape clone = new FreeHandLine(Map.of(
                "xStart", this.xStart,
                "yStart", this.yStart,
                "fillColor", this.fillColor,
                "strokeColor", this.strokeColor,
                "strokeWidth", this.strokeWidth
        ));
        for (int i = 2; i < points.size(); i += 2)
            clone.setEndPoints(points.get(i), points.get(i + 1));
        clone.transform(x + 5, y + 5, scaleX, scaleY, rotation);
        return clone;
    }
}

package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Triangle extends Shape {
    private List<Double> points;

    public Triangle(Map<String, Object> attributes) {
        super(attributes);
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
    public Double getX() {
        return points.isEmpty() ? 0.0 : points.getFirst();
    }

    @Override
    public Double getY() {
        return points.isEmpty() ? 0.0 : points.get(1);
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
        Shape clone = new Triangle(Map.of(
                "xStart", this.x,
                "yStart", this.y,
                "fillColor", this.fillColor,
                "strokeColor", this.strokeColor,
                "strokeWidth", this.strokeWidth
        ));
        clone.setEndPoints(this.xEnd, this.yEnd);
        clone.dimensionCalculate();
        clone.transform(x + 5, y + 5, scaleX, scaleY, rotation);
        return clone;
    }
}
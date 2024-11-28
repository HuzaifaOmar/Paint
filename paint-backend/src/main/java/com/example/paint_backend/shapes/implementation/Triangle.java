package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

public class Triangle extends AbstractShape {
    private List<Double> points;
    private Double x;
    private Double y;

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
    public void moveTo(double newX, double newY) {
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
}
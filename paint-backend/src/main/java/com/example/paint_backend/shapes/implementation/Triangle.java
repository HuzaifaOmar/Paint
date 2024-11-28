package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

public class Triangle extends AbstractShape {
    private List<Double> points;

    public Triangle(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        points = new ArrayList<>();
        points.add(this.xStart);
        points.add(this.yStart);
        if (this.xEnd == null || this.yEnd == null)
            return;
        points.add(this.xEnd);
        points.add(this.yStart);
        points.add((this.xEnd + this.xStart) / 2);
        points.add(this.yEnd);
    }

    @Override
    public void moveTo(double x, double y) {
        double xDiff = x - this.xStart;
        double yDiff = y - this.yStart;

        for (int i = 0; i < points.size(); i += 2) {
            points.set(i, points.get(i) + xDiff);
            points.set(i + 1, points.get(i + 1) + yDiff);
        }
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
        return Map.of(
                "points", this.points,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }
}
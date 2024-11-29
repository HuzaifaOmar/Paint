package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Ellipse extends Shape {
    private Double radiusX;
    private Double radiusY;

    public Ellipse(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        this.radiusX = Math.abs(xEnd - xStart);
        this.radiusY = Math.abs(yEnd - yStart);
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.xStart = newX;
        this.yStart = newY;
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
                "x", xStart,
                "y", yStart,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }

    @Override
    public Shape clone() {
        Shape clone = new Ellipse(getAttributes());
        clone.dimensionCalculate();
        clone.transform(x + 5, y + 5, scaleX, scaleY, rotation);
        return clone;
    }
}
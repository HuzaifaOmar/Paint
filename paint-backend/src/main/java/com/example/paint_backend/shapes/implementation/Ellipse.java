package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

public class Ellipse extends AbstractShape {
    private double radiusX;
    private double radiusY;

    public Ellipse(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        this.radiusX = Math.abs(xEnd - xStart);
        this.radiusY = Math.abs(yEnd - yStart);
    }

    @Override
    public void moveTo(double x, double y) {
        this.xStart = x;
        this.yStart = y;
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
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}
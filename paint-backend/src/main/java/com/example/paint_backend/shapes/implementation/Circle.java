package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.HashMap;
import java.util.Map;

public class Circle implements Shape {
    int shapeId;

    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    double x;
    double y;
    double lineWidth;
    double radius;
    String fillColor;
    String strokeColor;

    public Circle(Map<String, Object> attributes) {
        this.shapeId = (int) attributes.get("shapeId");
        this.xStart = (double) attributes.get("xStart");
        this.yStart = (double) attributes.get("yStart");
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.lineWidth = (double) attributes.get("lineWidth");
    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    private Double calculateDiameter(double xStart, double yStart, double xEnd, double yEnd) {
        return Math.sqrt((xEnd - xStart) * (xEnd - xStart) + (yEnd - yStart) * (yEnd - yStart));
    }
    @Override
    public void DimensionCalculate() {
        this.radius = calculateDiameter(xStart, yStart, xEnd, yEnd) / 2;
        this.x = xStart + radius;
        this.y = yStart + radius;
    }

    @Override
    public int getShapeId() {
        return shapeId;
    }

    @Override
    public String getShapeType() {
        return "circle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("radius", radius);
        attributes.put("x", x);
        attributes.put("y", y);
        attributes.put("fill", fillColor);
        attributes.put("stroke", strokeColor);
        attributes.put("strokeWidth", lineWidth);
        return attributes;
    }
}


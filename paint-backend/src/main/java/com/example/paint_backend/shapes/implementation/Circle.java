package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.HashMap;
import java.util.Map;

public class Circle implements Shape {
    int shapeId;

    double xEnd;
    double yEnd;
    double x;
    double y;
    double strokeWidth;
    double radius;
    String fillColor;
    String strokeColor;

    public Circle(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.x = ((Number) attributes.get("xStart")).doubleValue();
        this.y = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        //! initially the circle is just a point
        this.xEnd = x;
        this.yEnd = y;

    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    @Override
    public void DimensionCalculate() {
        this.radius = Math.sqrt((x - xEnd) * (x - xEnd) + (y - yEnd) * (y - yEnd));
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
        return Map.of(
                "radius", radius,
                "x", x,
                "y", y,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}


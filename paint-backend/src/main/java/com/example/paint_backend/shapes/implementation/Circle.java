package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Circle extends Shape {
    private Double radius;

    public Circle(Map<String, Object> attributes) {
        super(attributes);
        this.x = xStart;
        this.y = yStart;
    }

    @Override
    public void dimensionCalculate() {
        this.radius = Math.sqrt((xStart - xEnd) * (xStart - xEnd) + (yStart - yEnd) * (yStart - yEnd));
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "circle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "x", x,
                "y", y,
                "radius", radius,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }

    @Override
    public Shape clone() {
        Shape clone = new Circle(Map.of(
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
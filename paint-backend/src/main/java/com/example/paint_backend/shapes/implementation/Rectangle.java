package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Rectangle extends Shape {
    private Double height;
    private Double width;

    public Rectangle(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        this.width = Math.abs(xEnd - xStart);
        this.height = Math.abs(yEnd - yStart);

        x = Math.min(xStart, xEnd);
        y = Math.min(yStart, yEnd);
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public Double getX() {
        return x;
    }

    @Override
    public Double getY() {
        return y;
    }

    @Override
    public String getShapeType() {
        return "rectangle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "height", this.height,
                "width", this.width,
                "x", x,
                "y", y,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }

    @Override
    public Shape clone() {
        Shape clone = new Rectangle(Map.of(
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

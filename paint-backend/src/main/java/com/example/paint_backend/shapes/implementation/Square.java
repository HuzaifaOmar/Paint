package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Square extends Shape {
    private Double x;
    private Double y;
    private Double side = 0.0;

    public Square(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        this.side = Math.abs(Math.min(xEnd - xStart, yEnd - yStart));
        if (xEnd < xStart || yEnd < yStart) {
            x = xStart - this.side;
            y = yStart - this.side;
        } else {
            x = Math.min(xStart, xEnd);
            y = Math.min(yStart, yEnd);
        }
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
        return "square";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "side", this.side,
                "x", this.x,
                "y", this.y,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }

    @Override
    public Shape clone() {
        Shape clone = new Square(getAttributes());
        clone.dimensionCalculate();
        clone.transform(x + 5.0, y + 5.0, scaleX, scaleY, rotation);
        return clone;
    }
}
package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

public class Square extends AbstractShape {
    private double x;
    private double y;
    private double side = 0;

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
    public void moveTo(double x, double y) {
        this.x = x;
        this.y = y;
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
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }
}
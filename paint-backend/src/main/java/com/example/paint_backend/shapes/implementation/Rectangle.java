package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

public class Rectangle extends AbstractShape {
    private double x;
    private double y;
    private double height;
    private double width;

    public Rectangle(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        // Calculate width and height maintaining the bottom right corner
        this.width = Math.abs(xEnd - xStart);
        this.height = Math.abs(yEnd - yStart);

        if (xEnd < xStart || yEnd < yStart) {
            // When mouse moves up and left, adjust the top-left corner
            // While keeping the bottom right corner fixed
            x = Math.min(xStart, xEnd);
            y = Math.min(yStart, yEnd);
        } else {
            // When mouse moves down and right
            x = Math.min(xStart, xEnd);
            y = Math.min(yStart, yEnd);
        }
    }

    @Override
    public void moveTo(double newX, double newY) {
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
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }
}

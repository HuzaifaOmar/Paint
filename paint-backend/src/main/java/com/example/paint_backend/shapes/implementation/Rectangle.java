package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.Map;

public class Rectangle implements Shape {
    int shapeId;
    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    double x;
    double y;
    String fillColor;
    String strokeColor;
    double strokeWidth;
    double height;
    double width;

    public Rectangle(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        // ! initially the rectangle is just a point
        this.xEnd = xStart;
        this.yEnd = yStart;
    }

    @Override
    public void DimensionCalculate() {
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
    public void setEndPoints(double xEnd, double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    @Override
    public void setStartPoints(double xStart, double yStart) {
        this.xStart = xStart;
        this.yStart = yStart;
    }

    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    @Override
    public int getShapeId() {
        return shapeId;
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

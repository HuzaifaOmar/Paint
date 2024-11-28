package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Square implements Shape {
    Long shapeId;
    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    double x;
    double y;
    String fillColor;
    String strokeColor;
    double strokeWidth;
    double side = 0;

    public Square(Map<String, Object> attributes) {
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        // ! initially the square is just a point
        this.xEnd = xStart;
        this.yEnd = yStart;
    }

    @Override
    public void DimensionCalculate() {
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
    public void setEndPoints(double xEnd, double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    @Override
    public void setStartPoints(double xStart, double yStart) {
        this.xStart = xStart;
        this.yStart = yStart;
    }

    @Override
    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    @Override
    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
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
    public Long getShapeId() {
        return shapeId;
    }

    @Override
    public String getFillColor() {
        return fillColor;
    }

    @Override
    public String getStrokeColor() {
        return strokeColor;
    }

    @Override
    public void setShapeId(Long id) {
        this.shapeId = id;
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
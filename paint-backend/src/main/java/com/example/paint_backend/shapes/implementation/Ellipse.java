package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.shapes.Shape;

public class Ellipse implements Shape {

    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    double strokeWidth;
    String fillColor;
    String strokeColor;
    Long shapeId;
    double radiusX;
    double radiusY;

    public Ellipse(Map<String, Object> attributes) {
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        this.xEnd = this.xStart;
        this.yEnd = this.yStart;
    }

    @Override
    public void DimensionCalculate() {
        this.radiusX = Math.abs(xEnd - xStart);
        this.radiusY = Math.abs(yEnd - yStart);
    }

    @Override
    public Double getX() {
        return xStart;
    }

    @Override
    public Double getY() {
        return yStart;
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
    public String getFillColor() {
        return fillColor;
    }

    @Override
    public String getStrokeColor() {
        return strokeColor;
    }

    @Override
    public Long getShapeId() {
        return shapeId;
    }

    @Override
    public void setShapeId(Long id) {
        this.shapeId = id;
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

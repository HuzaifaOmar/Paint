package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.ArrayList;

import java.util.List;
import java.util.Map;

public class Triangle implements Shape {
    Long shapeId;
    double xStart;
    double yStart;
    Double xEnd;
    Double yEnd;
    List<Double> points;
    String fillColor;
    String strokeColor;
    double strokeWidth;

    public Triangle(Map<String, Object> attributes) {
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        this.strokeColor = (String) attributes.get("strokeColor");
    }

    @Override
    public void DimensionCalculate() {
        points = new ArrayList<>();
        points.add(this.xStart);
        points.add(this.yStart);
        if (this.xEnd == null || this.yEnd == null)
            return;
        points.add(this.xEnd);
        points.add(this.yStart);
        points.add((this.xEnd + this.xStart) / 2);
        points.add(this.yEnd);
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

    //TODO: implement this
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
    public void setShapeId(Long id) {
        this.shapeId = id;
    }

    @Override
    public String getShapeType() {
        return "triangle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "points", this.points,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }
}

package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Triangle implements Shape {
    int shapeId;
    double xStart;
    double yStart;
    double xEnd;
    double yEnd;
    List<Double> points;
    String fillColor;
    String strokeColor;
    double lineWidth;

    public Triangle(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.xStart = (double) attributes.get("xStart");
        this.yStart = (double) attributes.get("yStart");
        this.fillColor = (String) attributes.get("fillColor");
        this.lineWidth = (double) attributes.get("lineWidth");
        this.strokeColor = (String) attributes.get("strokeColor");
    }

    @Override
    public void DimensionCalculate() {
        points.add(this.xStart);
        points.add(this.yStart);
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
    public int getShapeId() {
        return shapeId;
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
                "strokeWidth", this.lineWidth);
    }
}

package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class Line implements Shape {

    int shapeId;
    double xStart;
    double yStart;
    double xEnd;
    double yEnd;
    String fillColor;
    double lineWidth;

    public Line(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.xStart = (double) attributes.get("xStart");
        this.yStart = (double) attributes.get("yStart");
        this.xEnd = (double) attributes.get("xEnd");
        this.yEnd = (double) attributes.get("yEnd");
        this.fillColor = (String) attributes.get("fillColor");
        this.lineWidth = (double) attributes.get("lineWidth");
    }

    @Override
    public void DimensionCalculate() {

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
        return "line";
    }

    @Override
    public Map<String, Object> getAttributes() {
        List<Double> points = Stream.of(this.xStart, this.yStart, this.xEnd, this.yEnd)
                .toList();

        return Map.of(
                "points", points,
                "fill", fillColor,
                "strokeWidth", lineWidth);
    }
}

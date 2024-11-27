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
    Double xStart;
    Double yStart;
    Double xEnd;
    Double yEnd;
    String strokeColor;
    double strokeWidth;

    public Line(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
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
        List<Double> points = Stream.of(this.xStart, this.yStart, this.xEnd == null ? this.xStart : this.xEnd, this.yEnd == null ? this.yStart : yEnd)
                .toList();

        return Map.of(
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}

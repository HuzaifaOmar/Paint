package com.example.paint_backend.shapes.implementation;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import com.example.paint_backend.shapes.Shape;

public class Line implements Shape {

    Long shapeId;
    Double xStart;
    Double yStart;
    Double xEnd;
    Double yEnd;
    String strokeColor;
    double strokeWidth;

    public Line(Map<String, Object> attributes) {
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
    }

    @Override
    public void DimensionCalculate() {

    }

    //TODO: implement moving for line or make another interface for Movable
    @Override
    public Double getX() {
        return 0.0;
    }

    @Override
    public Double getY() {
        return 0.0;
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
        this.strokeColor = fillColor;
    }

    @Override
    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
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
        return "line";
    }

    @Override
    public String getFillColor() {
        return strokeColor;
    }

    @Override
    public String getStrokeColor() {
        return strokeColor;
    }

    @Override
    public Map<String, Object> getAttributes() {
        List<Double> points = Stream
                .of(this.xStart, this.yStart, this.xEnd == null ? this.xStart : this.xEnd,
                        this.yEnd == null ? this.yStart : yEnd)
                .toList();

        return Map.of(
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}

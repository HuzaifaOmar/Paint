package com.example.paint_backend.shapes.implementation;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import com.example.paint_backend.shapes.Shape;

public class Line extends Shape {

    public Line(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        // No specific dimension calculation for line
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public String getShapeType() {
        return "line";
    }

    @Override
    public Map<String, Object> getAttributes() {
        List<Double> points = Stream
                .of(this.xStart, this.yStart,
                        this.xEnd == null ? this.xStart : this.xEnd,
                        this.yEnd == null ? this.yStart : yEnd)
                .toList();

        Map<String, Object> attributes = new java.util.HashMap<>(Map.of(
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth
        ));

        if (this.x != null) {
            attributes.put("x", this.x);
        }
        if (this.y != null) {
            attributes.put("y", this.y);
        }
        return attributes;
    }

    @Override
    public Shape clone() {
        Shape clone = new FreeHandLine(Map.of(
                "xStart", this.xStart,
                "yStart", this.yStart,
                "fillColor", this.fillColor,
                "strokeColor", this.strokeColor,
                "strokeWidth", this.strokeWidth
        ));
        clone.setEndPoints(this.xEnd, this.yEnd);
        clone.transform(x + 5, y + 5, scaleX, scaleY, rotation);
        return clone;
    }
}
package com.example.paint_backend.shapes.implementation;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import com.example.paint_backend.shapes.AbstractShape;

//TODO: implement moving for line or make another interface for Movable
public class Line extends AbstractShape {
    public Line(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public void dimensionCalculate() {
        // No specific dimension calculation for line
    }

    @Override
    public void moveTo(double x, double y) {
        double xDiff = x - this.xStart;
        double yDiff = y - this.yStart;

        this.xStart = x;
        this.yStart = y;

        this.xEnd += xDiff;
        this.yEnd += yDiff;
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

        return Map.of(
                "points", points,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}
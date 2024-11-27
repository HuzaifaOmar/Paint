package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.exception.MissingRequiredParametersException;
import com.example.paint_backend.shapes.Shape;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class FreeHandLine implements Shape {
    int shapeId;
    List<Double> points;
    String fillColor;
    double strokeWidth;

    public FreeHandLine(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.fillColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
        this.points = new ArrayList<>(
                List.of(((Number) attributes.get("xStart")).doubleValue(), ((Number) attributes.get("yStart")).doubleValue())
        );
    }

    @Override
    public void DimensionCalculate() {

    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.points.add(xEnd);
        this.points.add(yEnd);
    }

    @Override
    public int getShapeId() {
        return shapeId;
    }

    @Override
    public String getShapeType() {
        return "freehand";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "points", points,
                "strokeColor", fillColor,
                "strokeWidth", strokeWidth
        );
    }
}

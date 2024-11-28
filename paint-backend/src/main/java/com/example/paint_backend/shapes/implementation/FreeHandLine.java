package com.example.paint_backend.shapes.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.shapes.AbstractShape;

import com.example.paint_backend.shapes.Shape;
//
//public class FreeHandLine implements Shape {
//    Long shapeId;
//    List<Double> points;
//    String fillColor;
//
//    double strokeWidth;
//
//    public FreeHandLine(Map<String, Object> attributes) {
//        this.fillColor = (String) attributes.get("strokeColor");
//        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
//        this.points = new ArrayList<>(
//                List.of(((Number) attributes.get("xStart")).doubleValue(),
//                        ((Number) attributes.get("yStart")).doubleValue()));
//    }
//
//    @Override
//    public void DimensionCalculate() {
//
//    }
//
//    @Override
//    public Double getX() {
//        return 0.0;
//    }
//
//    @Override
//    public Double getY() {
//        return 0.0;
//    }
//
//    @Override
//    public void setEndPoints(double xEnd, double yEnd) {
//        this.points.add(xEnd);
//        this.points.add(yEnd);
//    }
//
//    @Override
//    public void setStartPoints(double xStart, double yStart) {
//        return;
//    }
//    @Override
//    public void setFillColor(String fillColor) {
//        this.fillColor = fillColor;
//    }
//
//    @Override
//    public void setStrokeColor(String strokeColor) {
//        return;
//    }
//
//    @Override
//    public String getFillColor() {
//        return fillColor;
//    }
//
//    @Override
//    public String getStrokeColor() {
//        return fillColor;
//    }
//
//    @Override
//    public Long getShapeId() {
//        return shapeId;
//    }
//
//    @Override
//    public void setShapeId(Long id) {
//        this.shapeId = id;
//    }
//
//    @Override
//    public String getShapeType() {
//        return "freehand";
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return Map.of(
//                "points", points,
//                "strokeColor", fillColor,
//                "strokeWidth", strokeWidth);
//    }
//}

//TODO: implement moving for line or make another interface for Movable
public class FreeHandLine extends AbstractShape {
    private final List<Double> points;

    public FreeHandLine(Map<String, Object> attributes) {
        super(attributes);
        this.points = new ArrayList<>(
                List.of(xStart, yStart));
    }

    @Override
    public void dimensionCalculate() {
        // No specific dimension calculation for freehand line
    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.points.add(xEnd);
        this.points.add(yEnd);
    }

    @Override
    public void moveTo(double x, double y) {
        double xDiff = x - points.getFirst();
        double yDiff = y - points.get(1);

        for (int i = 0; i < points.size(); i += 2) {
            points.set(i, points.get(i) + xDiff);
            points.set(i, points.get(i + 1) + yDiff);
        }
    }

    @Override
    public Double getX() {
        return points.isEmpty() ? 0.0 : points.getFirst();
    }

    @Override
    public Double getY() {
        return points.isEmpty() ? 0.0 : points.get(1);
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
                "strokeWidth", strokeWidth);
    }
}

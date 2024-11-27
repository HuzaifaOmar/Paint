package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Ellipse implements Shape {
    double xEnd;
    double yEnd;
    double x;
    double y;
    double strokeWidth;
    String fillColor;
    String strokeColor;
    int shapeId;
    double radiusX;
    double radiusY;

    public Ellipse(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.x = ((Number) attributes.get("xStart")).doubleValue();
        this.y = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();
    }

    @Override
    public void DimensionCalculate() {
        this.radiusX = Math.abs(xEnd - x);
        this.radiusY = Math.abs(yEnd - y);
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
        return "ellipse";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "radiusX", radiusX,
                "radiusY", radiusY,
                "x", x,
                "y", y,
                "fill", fillColor,
                "stroke", strokeColor,
                "strokeWidth", strokeWidth);
    }
}

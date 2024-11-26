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
    double lineWidth;
    String fillColor;
    String strokeColor;
    int shapeId;
    double radiusX;
    double radiusY;

    public Ellipse(Map<String, Object> attributes) {
        this.shapeId = (int) attributes.get("shapeId");
        this.x = (double) attributes.get("xStart");
        this.y = (double) attributes.get("yStart");
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.lineWidth = (double) attributes.get("lineWidth");
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
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("radiusX", radiusX);
        attributes.put("radiusY", radiusY);
        attributes.put("x", x);
        attributes.put("y", y);
        attributes.put("fill", fillColor);
        attributes.put("stroke", strokeColor);
        attributes.put("strokeWidth", lineWidth);

        return attributes;
    }
}

package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class Line implements Shape {

    int shapeId;
    double xStart;
    double yStart;
    double xEnd;
    double yEnd;
    String fillColor;
    double lineWidth;

    public Line(Map<String, Object> attributes) {
        this.shapeId = (int) attributes.get("shapeId");
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
        ArrayList<Double> points = new ArrayList<>();
        points.add(this.xStart);
        points.add(this.yStart);
        points.add(this.xEnd);
        points.add(this.yEnd);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("shapeId", shapeId);
        attributes.put("points", points);
        attributes.put("fill", fillColor);
        attributes.put("strokeWidth", lineWidth);

        return attributes;
    }
}

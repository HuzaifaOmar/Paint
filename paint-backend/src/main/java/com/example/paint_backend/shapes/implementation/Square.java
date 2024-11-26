package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;


public class Square implements Shape {
    int shapeId;
    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    String fillColor;
    String strokeColor;
    double lineWidth;
    double side;
    String shapeType;

    public Square(Map<String, Object> attributes) {
        this.shapeId = (int) attributes.get("shapeId");
        this.xEnd = (double) attributes.get("xEnd");
        this.yEnd = (double) attributes.get("yEnd");
        this.xStart = (double) attributes.get("xStart");
        this.yStart = (double) attributes.get("yStart");
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.lineWidth = (int) attributes.get("lineWidth");
    }

    @Override
    public void DimensionCalculate() {
        double length = Math.abs(xEnd - xStart);
        double width = Math.abs(yEnd - yStart);
        this.side = Math.min(length, width);
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
        return "square";
    }

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("shapeId", this.shapeId);
        attributes.put("side", this.side);
        attributes.put("x", this.xStart + this.side / 2);
        attributes.put("y", this.yStart + this.side / 2);
        attributes.put("fill", this.fillColor);
        attributes.put("stroke", this.strokeColor);
        attributes.put("strokeWidth", this.lineWidth);

        return attributes;
    }
}

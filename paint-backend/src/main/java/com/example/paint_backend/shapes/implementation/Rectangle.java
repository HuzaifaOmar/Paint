package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.shapes.Shape;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;


public class Rectangle implements Shape {
    int shapeId;
    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    String fillColor;
    String strokeColor;
    double lineWidth;
    double length;
    double width;
    String shapeType;

    public Rectangle(Map<String, Object> attributes) {
        this.shapeId = (int) attributes.get("shapeId");
        this.xStart = (double) attributes.get("xStart");
        this.yStart = (double) attributes.get("yStart");
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.lineWidth = (double) attributes.get("lineWidth");
    }

    @Override
    public void DimensionCalculate() {
        this.length = Math.abs(xEnd - xStart);
        this.width = Math.abs(yEnd - yStart);
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
        return shapeType;
    }

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("shapeId", this.shapeId);
        attributes.put("length", this.length);
        attributes.put("width", this.width);
        attributes.put("x", this.xStart + this.length / 2);
        attributes.put("y", this.yStart + this.width / 2);
        attributes.put("fill", this.fillColor);
        attributes.put("stroke", this.strokeColor);
        attributes.put("strokeWidth", this.lineWidth);

        return attributes;
    }
}

package com.example.paint_backend.ShapesCreator;

import org.json.JSONObject;

public class Rectangle implements Shapes {
    int shapeId;
    double xEnd;
    double yEnd;
    double xStart;
    double yStart;
    String firstColor;
    String secondColor;
    int lineWidth;
    double length;
    double width;
    String shapeType;

    public Rectangle(JSONObject json) {
        this.shapeId = json.getInt("shapeId");
        this.xEnd = json.getDouble("xEnd");
        this.yEnd = json.getDouble("yEnd");
        this.xStart = json.getDouble("xStart");
        this.yStart = json.getDouble("yStart");
        this.firstColor = json.getString("firstColor");
        this.secondColor = json.getString("secondColor");
        this.lineWidth = json.getInt("lineWidth");  
        this.shapeType = json.getString("shapetype");
    }
    @Override
    public void DemensionCalculate() {
        this.length = Math.abs(xEnd - xStart);
        this.width = Math.abs(yEnd - yStart);
    }
    @Override
    public void setEndPoints( double xEnd, double yEnd){
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }
    @Override
    public JSONObject toJsonObject() {
        JSONObject json = new JSONObject();
        json.put("shapeId", this.shapeId);
        json.put("length", this.length);    
        json.put("width", this.width);
        json.put("xStart", this.xStart);
        json.put("yStart", this.yStart);
        json.put("firstColor", this.firstColor);
        json.put("secondColor", this.secondColor);
        json.put("lineWidth", this.lineWidth);
        json.put("shapetype", this.shapeType);
        return json;
    }
}

package com.example.paint_backend.shapes;

import org.json.JSONObject;

import java.util.Map;

public interface Shape {
    public void DimensionCalculate();

    public void setEndPoints(double xEnd, double yEnd);

    int getShapeId();

    String getShapeType();

    Map<String, Object> getAttributes();
}

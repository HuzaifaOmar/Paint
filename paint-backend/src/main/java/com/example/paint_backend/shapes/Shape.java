package com.example.paint_backend.shapes;

import java.util.Map;

public interface Shape {
    public void DimensionCalculate();

    public void setStartPoints(double xStart,double yStart);

    public void setEndPoints(double xEnd, double yEnd);

    public void setFillColor(String fillColor);

    public void setStrokeColor(String Stroke);

    int getShapeId();

    String getShapeType();

    Map<String, Object> getAttributes();
}

package com.example.paint_backend.shapes;

import java.util.Map;

public interface Shape {
    void dimensionCalculate();

    Double getX();

    Double getY();

    void setEndPoints(double xEnd, double yEnd);

    void setFillColor(String fillColor);

    void setStrokeColor(String Stroke);
    void moveTo(double x, double y);
    Long getShapeId();

    String getFillColor();

    String getStrokeColor();

    void setShapeId(Long id);

    String getShapeType();

    Map<String, Object> getAttributes();
}

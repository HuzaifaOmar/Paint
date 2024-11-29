package com.example.paint_backend.shapes;


import lombok.Getter;
import lombok.Setter;

import java.util.Map;

public abstract class Shape {
    @Setter
    @Getter
    protected Long shapeId;
    @Setter
    @Getter
    protected String fillColor;
    @Getter
    @Setter
    protected String strokeColor;
    protected Double strokeWidth;
    protected Double xStart;
    protected Double yStart;
    protected Double xEnd;
    protected Double yEnd;
    protected Double x;
    protected Double y;
    @Getter
    protected Double scaleX = 1.0;
    @Getter
    protected Double scaleY = 1.0;
    @Getter
    protected Double rotation = 0.0;

    // Common constructor for all shapes
    public Shape(Map<String, Object> attributes) {
        this.xStart = ((Number) attributes.get("xStart")).doubleValue();
        this.yStart = ((Number) attributes.get("yStart")).doubleValue();
        this.fillColor = (String) attributes.get("fillColor");
        this.strokeColor = (String) attributes.get("strokeColor");
        this.strokeWidth = ((Number) attributes.get("strokeWidth")).doubleValue();

        //! Initialize end points to start points by default
        this.xEnd = this.xStart;
        this.yEnd = this.yStart;
    }

    // Default implementations for common methods
    public void moveTo(Double deltaX, Double deltaY) {
        this.xStart += deltaX;
        this.yStart += deltaY;
        dimensionCalculate();
    }

    public void transform(Double x, Double y, Double scaleX, Double scaleY, Double rotation) {
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.rotation = rotation;
    }

    public void setEndPoints(Double xEnd, Double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    public abstract void dimensionCalculate();

    public Double getX() {
        return xStart;
    }

    public Double getY() {
        return yStart;
    }

    public abstract String getShapeType();

    public abstract Map<String, Object> getAttributes();

    public abstract Shape clone();
}

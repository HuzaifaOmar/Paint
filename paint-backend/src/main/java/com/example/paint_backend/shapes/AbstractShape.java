package com.example.paint_backend.shapes;


import java.util.Map;

public abstract class AbstractShape implements Shape {
    protected Long shapeId;
    protected String fillColor;
    protected String strokeColor;
    protected double strokeWidth;
    protected double xStart;
    protected double yStart;
    protected Double xEnd;
    protected Double yEnd;

    // Common constructor for all shapes
    public AbstractShape(Map<String, Object> attributes) {
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
    @Override
    public void moveTo(double deltaX, double deltaY) {
        this.xStart += deltaX;
        this.yStart += deltaY;
        dimensionCalculate();
    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    @Override
    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    @Override
    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    @Override
    public Long getShapeId() {
        return shapeId;
    }

    @Override
    public void setShapeId(Long id) {
        this.shapeId = id;
    }

    @Override
    public String getFillColor() {
        return fillColor;
    }

    @Override
    public String getStrokeColor() {
        return strokeColor;
    }

    // Abstract method that each shape must implement
    public abstract void dimensionCalculate();

    // Optional default implementations for other methods
    @Override
    public Double getX() {
        return xStart;
    }

    @Override
    public Double getY() {
        return yStart;
    }
}

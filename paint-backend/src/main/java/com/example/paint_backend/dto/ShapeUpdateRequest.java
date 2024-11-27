package com.example.paint_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ShapeUpdateRequest {
    @JsonProperty("xEnd")
    private Double xEnd;

    @JsonProperty("yEnd")
    private Double yEnd;

    @JsonProperty("fillColor")
    private String fillColor;

    @JsonProperty("strokeColor")
    private String strokeColor;

    public Double getXEnd() {
        return xEnd;
    }

    public void setXEnd(Double xEnd) {
        this.xEnd = xEnd;
    }

    public String getFillColor() {
        return fillColor;
    }

    public void setFillColor(String fillColor) {
        this.fillColor = fillColor;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public Double getYEnd() {
        return yEnd;
    }

    public void setYEnd(Double yEnd) {
        this.yEnd = yEnd;
    }
}
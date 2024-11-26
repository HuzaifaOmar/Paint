package com.example.paint_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ShapeUpdateRequest {
    @JsonProperty("xEnd")
    private Double xEnd;

    @JsonProperty("yEnd")
    private Double yEnd;

    public Double getXEnd() {
        return xEnd;
    }

    public void setXEnd(Double xEnd) {
        this.xEnd = xEnd;
    }

    public Double getYEnd() {
        return yEnd;
    }

    public void setYEnd(Double yEnd) {
        this.yEnd = yEnd;
    }
}
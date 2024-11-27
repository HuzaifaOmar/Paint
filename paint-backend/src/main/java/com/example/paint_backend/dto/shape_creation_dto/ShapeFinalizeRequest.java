package com.example.paint_backend.dto.shape_creation_dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ShapeFinalizeRequest {

    @JsonProperty("fillColor")
    private String fillColor;

    @JsonProperty("strokeColor")
    private String strokeColor;

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

}
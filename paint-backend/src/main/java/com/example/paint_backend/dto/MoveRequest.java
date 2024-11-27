
package com.example.paint_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MoveRequest {
    @JsonProperty("xStart")
    private Double xStart;

    @JsonProperty("yStart")
    private Double yStart;

    public Double getXStart() {
        return xStart;
    }

    public void setXStart(Double xStart) {
        this.xStart = xStart;
    }

    public Double getYStart() {
        return yStart;
    }

    public void setYStart(Double yStart) {
        this.yStart = yStart;
    }
}
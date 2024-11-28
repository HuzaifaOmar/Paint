package com.example.paint_backend.dto.shape_creation_request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShapeUpdateRequest {
    @JsonProperty("xEnd")
    private Double xEnd;
    @JsonProperty("yEnd")
    private Double yEnd;
}

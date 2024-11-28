package com.example.paint_backend.dto.shape_creation_request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ShapeFinalizeRequest {

    @JsonProperty("fillColor")
    private String fillColor;

    @JsonProperty("strokeColor")
    private String strokeColor;

}
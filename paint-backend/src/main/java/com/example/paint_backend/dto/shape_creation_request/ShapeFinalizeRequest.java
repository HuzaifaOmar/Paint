package com.example.paint_backend.dto.shape_creation_request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ShapeFinalizeRequest {
    private String fillColor;
    private String strokeColor;
}
package com.example.paint_backend.dto.command_requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransformRequest {
    private Double x;
    private Double y;
    private Double scaleX;
    private Double scaleY;
    private Double rotation;
}

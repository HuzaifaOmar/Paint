package com.example.paint_backend.dto.command_requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecolorRequest {
    private String  fillColor;
    private String  strokeColor;
}

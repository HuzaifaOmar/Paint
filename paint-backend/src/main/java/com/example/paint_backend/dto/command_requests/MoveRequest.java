
package com.example.paint_backend.dto.command_requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MoveRequest {
    @JsonProperty("x")
    private Double x;

    @JsonProperty("y")
    private Double y;

}
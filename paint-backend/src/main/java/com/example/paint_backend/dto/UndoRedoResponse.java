package com.example.paint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UndoRedoResponse {
    private String type; //* "create", "update", "delete"
    private ShapeDTO shape;
    private final boolean success;

    public UndoRedoResponse(boolean success) {
        this.success = success;
    }
}

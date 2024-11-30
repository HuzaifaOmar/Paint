package com.example.paint_backend.commands;

import com.example.paint_backend.dto.UndoRedoResponse;

public interface ShapeCommand {
    void execute();
    void undo();
    UndoRedoResponse getUndoResponse();
    UndoRedoResponse getRedoResponse();
}

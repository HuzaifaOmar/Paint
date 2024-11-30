package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.UndoRedoResponse;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

public class RecolorShapeCommand implements ShapeCommand {
    private final ShapeRepository shapeRepository;
    private final Shape shape;
    private final String oldFillColor;
    private final String newFillColor;
    private final String oldStrokeColor;
    private final String newStrokeColor;

    public RecolorShapeCommand(ShapeRepository shapeRepository, Shape shape, String newFillColor, String newStrokeColor) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
        this.oldFillColor = shape.getFillColor();
        this.newFillColor = newFillColor;
        this.newStrokeColor = newStrokeColor;
        this.oldStrokeColor = shape.getStrokeColor();
    }

    @Override
    public void execute() {
        shape.setStrokeColor(newStrokeColor);
        shape.setFillColor(newFillColor);
        shapeRepository.update(shape);

    }

    @Override
    public void undo() {
        shape.setStrokeColor(oldStrokeColor);
        shape.setFillColor(oldFillColor);
        shapeRepository.update(shape);
    }

    @Override
    public UndoRedoResponse getUndoResponse() {
        return new UndoRedoResponse("update", new ShapeDTO(shape), true);
    }

    @Override
    public UndoRedoResponse getRedoResponse() {
        return new UndoRedoResponse("update", new ShapeDTO(shape), true);
    }
}

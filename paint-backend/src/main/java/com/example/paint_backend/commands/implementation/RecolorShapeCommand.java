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
    private final Double oldStrokeWidth;
    private final Double newStrokeWidth;

    public RecolorShapeCommand(ShapeRepository shapeRepository, Shape shape, String newFillColor,
            String newStrokeColor, double newStrokeWidth) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
        this.newFillColor = newFillColor;
        this.oldFillColor = shape.getFillColor();
        this.newStrokeColor = newStrokeColor;
        this.oldStrokeColor = shape.getStrokeColor();
        this.newStrokeWidth = newStrokeWidth;
        this.oldStrokeWidth = shape.getStrokeWidth();
    }

    @Override
    public void execute() {
        shape.setFillColor(newFillColor);
        shape.setStrokeColor(newStrokeColor);
        shape.setStrokeWidth(newStrokeWidth);
        shapeRepository.update(shape);
    }

    @Override
    public void undo() {
        shape.setFillColor(oldFillColor);
        shape.setStrokeColor(oldStrokeColor);
        shape.setStrokeWidth(oldStrokeWidth);
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

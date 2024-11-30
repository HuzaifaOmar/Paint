package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.UndoRedoResponse;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

public class TransformShapeCommand implements ShapeCommand {
    private final ShapeRepository shapeRepository;
    private final Shape shape;
    private final Double newX;
    private final Double newY;
    private final Double oldX;
    private final Double oldY;
    private final Double oldScaleX;
    private final Double oldScaleY;
    private final Double newScaleX;
    private final Double newScaleY;
    private final Double oldRotation;
    private final Double newRotation;

    public TransformShapeCommand(ShapeRepository shapeRepository, Shape shape, Double newX, Double newY, Double newScaleX, Double newScaleY, Double newRotation) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
        this.newX = newX;
        this.newY = newY;
        this.oldX = shape.getX();
        this.oldY = shape.getY();
        this.oldScaleX = shape.getScaleX();
        this.oldScaleY = shape.getScaleY();
        this.newScaleX = newScaleX;
        this.newScaleY = newScaleY;
        this.oldRotation = shape.getRotation();
        this.newRotation = newRotation;
    }

    @Override
    public void execute() {
        shape.transform(newX, newY, newScaleX, newScaleY, newRotation);
        shapeRepository.update(shape);
    }

    @Override
    public void undo() {
        shape.transform(oldX, oldY, oldScaleX, oldScaleY, oldRotation);
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

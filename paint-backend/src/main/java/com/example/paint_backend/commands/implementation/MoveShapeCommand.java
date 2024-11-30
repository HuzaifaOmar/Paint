package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.UndoRedoResponse;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

public class MoveShapeCommand implements ShapeCommand {
    private final ShapeRepository shapeRepository;
    private final Shape shape;
    private final Double newX;
    private final Double newY;
    private final Double oldX;
    private final Double oldY;

    public MoveShapeCommand(ShapeRepository shapeRepository, Shape shape, Double newX, Double newY) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
        this.newX = newX;
        this.newY = newY;
        this.oldX = shape.getX();
        this.oldY = shape.getY();
    }

    @Override
    public void execute() {
        shape.moveTo(newX, newY);
        shapeRepository.update(shape);
    }

    @Override
    public void undo() {
        shape.moveTo(oldX, oldY);
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

package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.UndoRedoResponse;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;


public class EraseShapesCommand implements ShapeCommand {
    private final Shape shape;
    private final ShapeRepository shapeRepository;

    public EraseShapesCommand(Shape shape, ShapeRepository shapeRepository) {
        this.shape = shape;
        this.shapeRepository = shapeRepository;
    }

    @Override
    public void execute() {
        shapeRepository.deleteById(shape.getShapeId());
    }

    @Override
    public void undo() {
        shapeRepository.save(shape);
    }

    @Override
    public UndoRedoResponse getUndoResponse() {
        return new UndoRedoResponse("create", new ShapeDTO(shape), true);
    }

    @Override
    public UndoRedoResponse getRedoResponse() {
        return new UndoRedoResponse("delete", new ShapeDTO(shape), true);
    }
}

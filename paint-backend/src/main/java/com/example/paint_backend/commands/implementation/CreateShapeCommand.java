package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

public class CreateShapeCommand implements ShapeCommand {
    private final ShapeRepository shapeRepository;
    private final Shape shape;

    public CreateShapeCommand(ShapeRepository shapeRepository, Shape shape) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
    }

    @Override
    public void execute() {
        shapeRepository.save(shape);
    }

    @Override
    public void undo() {
        shapeRepository.deleteById(shape.getShapeId());
    }
}

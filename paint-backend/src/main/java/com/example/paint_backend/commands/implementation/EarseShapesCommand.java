package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;


public class EarseShapesCommand implements ShapeCommand  {
    private final Shape shape;
    private final ShapeRepository shapeRepository;

    public EarseShapesCommand(Shape shape , ShapeRepository shapeRepository) {
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
}

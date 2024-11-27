package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;

public class CreateShapeCommand implements ShapeCommand {
    private final ShapeRepository shapeRepository;
    private final Shape shape;
    private final String fill;
    private final String stroke;

    // Constructor to pass ShapeRepository and ShapeRequest
    public CreateShapeCommand(ShapeRepository shapeRepository, Shape shape, String fillColor, String strokeColor) {
        this.shapeRepository = shapeRepository;
        this.shape = shape;
        this.fill = fillColor;
        this.stroke = strokeColor;
    }

    @Override
    public void execute() {
        shape.setFillColor(fill);
        shape.setStrokeColor(stroke);
        shapeRepository.save(shape);
    }

    @Override
    public void undo() {
        shapeRepository.deleteById(shape.getShapeId());
    }
}

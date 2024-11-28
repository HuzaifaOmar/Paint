package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.shapes.Shape;

public class MoveShapeCommand implements ShapeCommand {
    private final Shape shape;
    private Double oldX;
    private Double oldY;
    private final Double newX;
    private final Double newY;

    public MoveShapeCommand(Shape shape, Double newX, Double newY) {
        this.shape = shape;
        this.newX = newX;
        this.newY = newY;
    }

    @Override
    public void execute() {
        oldX = shape.getX();
        oldY = shape.getY();
        shape.setStartPoints(newX, newY);
    }

    @Override
    public void undo() {
        shape.setStartPoints(oldX, oldY);
    }
}

package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.shapes.Shape;

public class MoveShapeCommand implements ShapeCommand {
    private final Shape shape;
    private final Double newX;
    private final Double newY;
    private final Double oldX;
    private final Double oldY;

    public MoveShapeCommand(Shape shape, Double newX, Double newY) {
        this.shape = shape;
        this.newX = newX;
        this.newY = newY;
        this.oldX = shape.getX();
        this.oldY = shape.getY();
    }

    @Override
    public void execute() {
        shape.moveTo(newX, newY);
    }

    @Override
    public void undo() {
        shape.moveTo(oldX, oldY);
    }
}

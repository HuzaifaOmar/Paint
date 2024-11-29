package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.shapes.Shape;

public class RecolorShapeCommand implements ShapeCommand {
    private final Shape shape;
    private final String oldFillColor;
    private final String newFillColor;
    private final String oldStrokeColor;
    private final String newStrokeColor;

    public RecolorShapeCommand(Shape shape, String newFillColor, String newStrokeColor) {
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
    }

    @Override
    public void undo() {
        shape.setStrokeColor(oldStrokeColor);
        shape.setFillColor(oldFillColor);
    }
}

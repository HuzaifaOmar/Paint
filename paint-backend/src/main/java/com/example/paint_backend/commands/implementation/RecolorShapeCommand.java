package com.example.paint_backend.commands.implementation;

import com.example.paint_backend.commands.ShapeCommand;
import com.example.paint_backend.shapes.Shape;

public class RecolorShapeCommand implements ShapeCommand {
    private final Shape shape;
    private final String oldFillColor;
    private final String neFillColor;

    public RecolorShapeCommand(Shape shape, String newFillColor) {
        this.shape = shape;
        this.oldFillColor = shape.getFillColor();
        this.neFillColor = newFillColor;
    }

    @Override
    public void execute() {
       
        shape.setFillColor(neFillColor);
    }

    @Override
    public void undo() {
        shape.setFillColor(oldFillColor);
    }
}

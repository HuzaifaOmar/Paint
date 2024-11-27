package com.example.paint_backend.commands;

import java.util.Deque;
import java.util.LinkedList;

public class CommandHistory {

    private final Deque<ShapeCommand> undoStack = new LinkedList<>();
    private final Deque<ShapeCommand> redoStack = new LinkedList<>();

    // Add a command to the history
    public void push(ShapeCommand command) {
        undoStack.push(command);
        redoStack.clear(); // Clear redo stack when a new command is executed
    }

    // Get the last command for undo
    public ShapeCommand popUndo() {
        return undoStack.isEmpty() ? null : undoStack.pop();
    }

    // Get the last undone command for redo
    public ShapeCommand popRedo() {
        return redoStack.isEmpty() ? null : redoStack.pop();
    }

    // Save an undone command to the redo stack
    public void pushRedo(ShapeCommand command) {
        redoStack.push(command);
    }

    // Check if undo/redo operations are available
    public boolean canUndo() {
        return !undoStack.isEmpty();
    }

    public boolean canRedo() {
        return !redoStack.isEmpty();
    }

}
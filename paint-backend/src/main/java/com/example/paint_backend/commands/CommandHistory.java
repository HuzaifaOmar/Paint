package com.example.paint_backend.commands;

import java.util.Deque;
import java.util.LinkedList;
import java.util.Optional;

public class CommandHistory {

    private final Deque<ShapeCommand> undoStack = new LinkedList<>();
    private final Deque<ShapeCommand> redoStack = new LinkedList<>();

    public void push(ShapeCommand command) {
        undoStack.push(command);
        redoStack.clear();
    }

    public Optional<ShapeCommand> popUndo() {
        return undoStack.isEmpty() ? Optional.empty() : Optional.ofNullable(undoStack.pop());
    }

    public Optional<ShapeCommand> popRedo() {
        return redoStack.isEmpty() ? Optional.empty() : Optional.ofNullable(redoStack.pop());
    }

    public void pushRedo(ShapeCommand command) {
        redoStack.push(command);
    }

    public boolean canUndo() {
        return !undoStack.isEmpty();
    }

    public boolean canRedo() {
        return !redoStack.isEmpty();
    }

    public void clear() {
        undoStack.clear();
        redoStack.clear();
    }

}

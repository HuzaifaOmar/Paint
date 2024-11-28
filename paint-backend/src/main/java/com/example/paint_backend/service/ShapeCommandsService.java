package com.example.paint_backend.service;

import org.springframework.stereotype.Service;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.commands.implementation.EarseShapesCommand;
import com.example.paint_backend.commands.implementation.MoveShapeCommand;
import com.example.paint_backend.commands.implementation.RecolorShapeCommand;
import com.example.paint_backend.dto.command_requests.MoveRequest;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.exception.ShapeNotFoundException;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;
@Service
public class ShapeCommandsService {

    private final ShapeRepository shapeRepository;
    private final CommandHistory commandHistory;

    public ShapeCommandsService(ShapeRepository shapeRepository, CommandHistory commandHistory) {
        this.shapeRepository = shapeRepository;
        this.commandHistory = commandHistory;
    }

    public ShapeDTO moveShape(Long shapeId, MoveRequest request) {
        Shape shape = findShapeById(shapeId);
        MoveShapeCommand moveShapeCommand = new MoveShapeCommand(shape , request.getXStart(), request.getYStart());
        moveShapeCommand.execute();
        commandHistory.push(moveShapeCommand);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public ShapeDTO recolorShape(Long shapeId, String newFillColor) {
        Shape shape = findShapeById(shapeId);
        RecolorShapeCommand recolorShapeCommand = new RecolorShapeCommand(shape, newFillColor);
        commandHistory.push(recolorShapeCommand);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public String  eraseShape(Long shapeId) {
        Shape shape = findShapeById(shapeId);
        EarseShapesCommand eraseShapeCommand = new EarseShapesCommand(shape , shapeRepository);
        commandHistory.push(eraseShapeCommand);
        return "Shape erased successfully";
    }

    private Shape findShapeById(Long shapeId) {
        return shapeRepository.findById(shapeId).orElseThrow(() -> new ShapeNotFoundException(shapeId));
    }

    // private void validateShapeRequest(ShapeRequest request) {
    //     if (request.getShapeType() == null || request.getShapeType().isEmpty()) {
    //         throw new InvalidShapeTypeException("Shape type is required");
    //     }
    // }
}
package com.example.paint_backend.service;

import org.springframework.stereotype.Service;

import com.example.paint_backend.commands.CommandHistory;
import com.example.paint_backend.commands.implementation.CreateShapeCommand;
import com.example.paint_backend.commands.implementation.EraseShapesCommand;
import com.example.paint_backend.commands.implementation.MoveShapeCommand;
import com.example.paint_backend.commands.implementation.RecolorShapeCommand;
import com.example.paint_backend.commands.implementation.TransformShapeCommand;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.command_requests.MoveRequest;
import com.example.paint_backend.dto.command_requests.RecolorRequest;
import com.example.paint_backend.dto.command_requests.TransformRequest;
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
        MoveShapeCommand moveShapeCommand = new MoveShapeCommand(shape, request.getX(), request.getY());
        moveShapeCommand.execute();
        commandHistory.push(moveShapeCommand);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public ShapeDTO transformShape(Long shapeId, TransformRequest request) {
        Shape shape = findShapeById(shapeId);
        TransformShapeCommand transformShapeCommand = new TransformShapeCommand(shape, request.getX(), request.getY(), request.getScaleX(), request.getScaleY(), request.getRotation());
        transformShapeCommand.execute();
        commandHistory.push(transformShapeCommand);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public ShapeDTO recolorShape(Long shapeId, RecolorRequest request) {
        Shape shape = findShapeById(shapeId);
        RecolorShapeCommand recolorShapeCommand = new RecolorShapeCommand(shape, request.getFillColor(), request.getStrokeColor());
        commandHistory.push(recolorShapeCommand);
        shapeRepository.update(shape);
        return new ShapeDTO(shape);
    }

    public String eraseShape(Long shapeId) {
        Shape shape = findShapeById(shapeId);
        EraseShapesCommand eraseShapeCommand = new EraseShapesCommand(shape, shapeRepository);
        commandHistory.push(eraseShapeCommand);
        return "Shape erased successfully";
    }

    public ShapeDTO cloneShape(Long shapeId) {
        Shape shape = findShapeById(shapeId);
        CreateShapeCommand createShapeCommand = new CreateShapeCommand(shapeRepository, shape.clone());
        createShapeCommand.execute();
        commandHistory.push(createShapeCommand);
        return new ShapeDTO(shape);
    }

    private Shape findShapeById(Long shapeId) {
        return shapeRepository.findById(shapeId).orElseThrow(() -> new ShapeNotFoundException(shapeId));
    }

}

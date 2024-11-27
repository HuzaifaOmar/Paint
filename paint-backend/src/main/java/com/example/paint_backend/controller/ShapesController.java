package com.example.paint_backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.paint_backend.dto.MoveRequest;
import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.dto.ShapeFinalizeRequest;
import com.example.paint_backend.dto.ShapeRequest;
import com.example.paint_backend.dto.ShapeUpdateRequest;
import com.example.paint_backend.exception.InvalidShapeTypeException;
import com.example.paint_backend.exception.MissingRequiredParametersException;
import com.example.paint_backend.exception.ShapeNotFoundException;
import com.example.paint_backend.shapes.Shape;
import com.example.paint_backend.factory.ShapeFactory;
// import org.json.JSONArray;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shapes")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for this specific endpoint
public class ShapesController {

    int shapeIdCounter = 1;
    private final List<Shape> shapesList = new ArrayList<>();
    // private final JSONArray shapesArray = new JSONArray();

    @PostMapping("/create")
    public ResponseEntity<ShapeDTO> createShape(@RequestBody ShapeRequest shapeRequest) {
        System.out.println("new create request");

        String shapeType = shapeRequest.getShapeType();
        if (shapeType == null || shapeType.isEmpty())
            throw new InvalidShapeTypeException("Shape type is required and cannot be empty");

        Map<String, Object> attributes = shapeRequest.getAttributes();
        attributes.put("shapeId", shapeIdCounter);

        Shape shape = new ShapeFactory().getShape(shapeType, shapeIdCounter, attributes);
        shapeIdCounter++;

        shape.DimensionCalculate();
        shapesList.add(shape);
        System.out.println("returning shape");
        ShapeDTO response = new ShapeDTO(shape);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{shapeId}")
    public ResponseEntity<ShapeDTO> updateShape(
            @PathVariable int shapeId,
            @RequestBody ShapeUpdateRequest request) {
        System.out.println("new update request");

        Shape shape = findShapeById(shapeId);

        if (request.getXEnd() != null && request.getYEnd() != null) {
            shape.setEndPoints(request.getXEnd(), request.getYEnd());
            shape.DimensionCalculate();
        } else {
            throw new MissingRequiredParametersException("missing attributes");
        }

        return ResponseEntity.ok(new ShapeDTO(shape));
    }

    @PutMapping("/finalize/{shapeId}")
    public ResponseEntity<ShapeDTO> finalizeShape(
            @PathVariable int shapeId,
            @RequestBody ShapeFinalizeRequest request) {
        System.out.println("new finalize request");

        Shape shape = findShapeById(shapeId);

        if (request.getFillColor() != null && request.getStrokeColor() != null) {
            shape.setFillColor(request.getFillColor());
            shape.setStrokeColor(request.getStrokeColor());
        } else {
            throw new MissingRequiredParametersException("missing attributes");
        }
        return ResponseEntity.ok(new ShapeDTO(shape));
    }

    @PutMapping("/move/{shapeId}")
    public ResponseEntity<ShapeDTO> move(
            @PathVariable int shapeId,
            @RequestBody MoveRequest request) {
        System.out.println("new move request");

        Shape shape = findShapeById(shapeId);

        if (request.getXStart() != null && request.getYStart() != null) {
            shape.setStartPoints(request.getXStart(), request.getYStart());
        } else {
            throw new MissingRequiredParametersException("missing attributes");
        }
        return ResponseEntity.ok(new ShapeDTO(shape));
    }

    private Shape findShapeById(int shapeId) {
        return shapesList.stream()
                .filter(shape -> shape.getShapeId() == shapeId)
                .findFirst()
                .orElseThrow(() -> new ShapeNotFoundException(shapeId));
    }

}

package com.example.paint_backend.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.paint_backend.shapes.Shape;
import org.springframework.stereotype.Repository;

@Repository
public class ShapeRepository {
    private final List<Shape> shapes = new ArrayList<>();

    public Shape save(Shape shape) {//TODO: check if any shape deleted there will be 2 shape with same id
        if (shape.getShapeId() == null) {
            shape.setShapeId((long) shapes.size() + 1);
        }
        shapes.add(shape);
        return shape;
    }

    public Optional<Shape> findById(Long id) {
        return shapes.stream()
                .filter(shape -> shape.getShapeId().equals(id))
                .findFirst();
    }

    public List<Shape> findAll() {
        return new ArrayList<>(shapes);
    }

    public void deleteById(Long id) {
        shapes.removeIf(shape -> shape.getShapeId().equals(id));
    }

    public void update(Shape shape) {
        for (int i = 0; i < shapes.size(); i++) {
            if (shapes.get(i).getShapeId().equals(shape.getShapeId())) {
                shapes.set(i, shape);
                break;
            }
        }
    }
}
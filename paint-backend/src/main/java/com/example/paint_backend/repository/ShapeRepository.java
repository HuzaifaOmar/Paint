package com.example.paint_backend.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.factory.ShapeFactory;
import com.example.paint_backend.shapes.Shape;
@Repository
public class ShapeRepository {
    private final ShapeFactory shapeFactory = new ShapeFactory();
    private final List<Shape> shapes = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public Shape save(Shape shape) {
        if (shape.getShapeId() == null) {
            shape.setShapeId(idGenerator.getAndIncrement());
        } else {
            update(shape);
            return shape;
        }
        System.out.println("new shape added with id: " + shape.getShapeId());
        shapes.add(shape);
        return shape;
    }

    public Optional<Shape> findById(Long id) {
        return shapes.stream().filter(shape -> shape.getShapeId().equals(id)).findFirst();
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
    public void clear() {
        shapes.clear();
        idGenerator.set(1);
    }
    public void addAll(List<ShapeDTO> shapes) {
        shapes.forEach(shapeDTO -> {
            Shape shape = shapeFactory.getShapeByDTO(shapeDTO);
            this.shapes.add(shape);
            idGenerator.set(shape.getShapeId() + 1);
        });
    }
}

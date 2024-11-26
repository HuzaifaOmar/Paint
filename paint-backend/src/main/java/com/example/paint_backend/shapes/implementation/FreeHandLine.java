package com.example.paint_backend.shapes.implementation;

import com.example.paint_backend.exception.MissingRequiredParametersException;
import com.example.paint_backend.shapes.Shape;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class FreeHandLine implements Shape {
    int shapeId;
    List<Double> points;
    String fillColor;
    double lineWidth;

    public FreeHandLine(int shapeId, Map<String, Object> attributes) {
        this.shapeId = shapeId;
        this.fillColor = (String) attributes.get("fillColor");
        this.lineWidth = (double) attributes.get("lineWidth");
        //! make sure there is a list then casting each element to (Double)
        this.points = Optional.ofNullable(attributes.get("points"))
                .filter(List.class::isInstance)
                .map(obj -> (List<?>) obj)
                .orElseThrow(() -> new MissingRequiredParametersException("missing starting points for freehand line"))
                .stream()
                .filter(Double.class::isInstance)
                .map(Double.class::cast)
                .collect(Collectors.toList());
    }

    @Override
    public void DimensionCalculate() {

    }

    @Override
    public void setEndPoints(double xEnd, double yEnd) {
        this.points.add(xEnd);
        this.points.add(yEnd);
    }

    @Override
    public int getShapeId() {
        return shapeId;
    }

    @Override
    public String getShapeType() {
        return "freehand";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "points", points,
                "fill", fillColor,
                "strokeWidth", lineWidth
        );
    }
}

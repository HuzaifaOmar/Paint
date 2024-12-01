package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Square extends Shape {
    private Double side = 0.0;

    public Square(Map<String, Object> attributes) {
        super(attributes);
    }

    public Square(ShapeDTO shapeDTO) {
       this.x = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault ("x", "100.0").toString() );
       this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
       this.side = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("side", "0.0").toString()); 
       this.scaleX = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleX", "1.0").toString());
       this.scaleY = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("scaleY", "1.0").toString());
       this.rotation = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("rotation", "0.0").toString());
       this.fillColor = (String) shapeDTO.getAttributes().getOrDefault("fill", "black");
       this.strokeColor = (String) shapeDTO.getAttributes().getOrDefault("stroke", "black");
       this.strokeWidth = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("strokeWidth", "1.0").toString());
       this.shapeId = shapeDTO.getShapeId();
    }

    @Override
    public void dimensionCalculate() {
        this.side = Math.abs(Math.min(xEnd - xStart, yEnd - yStart));
        if (xEnd < xStart || yEnd < yStart) {
            x = xStart - this.side;
            y = yStart - this.side;
        } else {
            x = Math.min(xStart, xEnd);
            y = Math.min(yStart, yEnd);
        }
    }

    @Override
    public void moveTo(Double newX, Double newY) {
        this.x = newX;
        this.y = newY;
    }

    @Override
    public Double getX() {
        return x;
    }

    @Override
    public Double getY() {
        return y;
    }

    @Override
    public String getShapeType() {
        return "square";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "side", this.side,
                "x", this.x,
                "y", this.y,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }

    @Override
    public Shape clone() {
        Square clone = new Square();
        clone.side = this.side;
        clone.x = this.x + 10;
        clone.y = this.y + 10;
        clone.scaleX = this.scaleX;
        clone.scaleY = this.scaleY;
        clone.rotation = this.rotation;
        clone.fillColor = this.fillColor;
        clone.strokeColor = this.strokeColor;
        clone.strokeWidth = this.strokeWidth;
        return clone;
    }
}
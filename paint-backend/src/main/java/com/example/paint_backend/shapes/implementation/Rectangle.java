package com.example.paint_backend.shapes.implementation;

import java.util.Map;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.shapes.Shape;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Rectangle extends Shape {
    private Double height;
    private Double width;

    public Rectangle(Map<String, Object> attributes) {
        super(attributes);
    }
    public Rectangle(ShapeDTO shapeDTO) {
       this.x = (Double) Double.parseDouble(  shapeDTO.getAttributes().getOrDefault ("x", "100.0").toString() );
       this.y = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("y", "100.0").toString());
       this.height = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("height", "0.0").toString());
       this.width = (Double) Double.parseDouble(shapeDTO.getAttributes().getOrDefault("width", "0.0").toString());
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
        this.width = Math.abs(xEnd - xStart);
        this.height = Math.abs(yEnd - yStart);

        x = Math.min(xStart, xEnd);
        y = Math.min(yStart, yEnd);
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
        return "rectangle";
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "height", this.height,
                "width", this.width,
                "x", x,
                "y", y,
                "scaleX", scaleX,
                "scaleY", scaleY,
                "rotation", rotation,
                "fill", this.fillColor,
                "stroke", this.strokeColor,
                "strokeWidth", this.strokeWidth);
    }

    @Override
    public Shape clone() {
        Rectangle clone = new Rectangle();
        clone.height = this.height;
        clone.width = this.width;
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

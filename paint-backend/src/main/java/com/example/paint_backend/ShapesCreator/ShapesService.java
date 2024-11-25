package com.example.paint_backend.ShapesCreator;

import org.json.JSONObject;

public class ShapesService {
    public static class Rectangle {
        int xEnd;
        int yEnd;
        int xStart;
        int yStart;
        int color;
        int lineWidth;
        int length;
        int width;

        public Rectangle(int xEnd, int yEnd, int xStart, int yStart, int color, int lineWidth) {
            this.xEnd = xEnd;
            this.yEnd = yEnd;
            this.xStart = xStart;
            this.yStart = yStart;
            this.color = color;
            this.lineWidth = lineWidth;
        }
        public void RecDemensionCalculate() {
            this.length = Math.abs(this.xEnd - this.xStart);
            this.width = Math.abs(this.yEnd - this. yStart);
        }   
        
        public JSONObject toJsonObject() {
            JSONObject json = new JSONObject();
            json.put("length", this.length);
            json.put("width", this.width);
            json.put("xStart", this.xStart);
            json.put("yStart", this.yStart);
            json.put("color", this.color);
            json.put("lineWidth", this.lineWidth);
            return json;
        }
    }
}

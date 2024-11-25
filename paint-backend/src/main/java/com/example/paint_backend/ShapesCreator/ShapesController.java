package com.example.paint_backend.ShapesCreator;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shapes")
public class ShapesController {

    @PostMapping("/rectangle")
    public ResponseEntity<String> calculateRectangleDimensions(@RequestBody String rawRequest) {
        try {
            // Log the raw request body
            System.out.println("Received raw request: " + rawRequest);
    
            // Parse the raw request into a JSONObject
            JSONObject request = new JSONObject(rawRequest);
    
            // System.out.println("Parsed request: " + request.toString());
    
            // Instantiate the Rectangle object
            Rectangle rectangle = new Rectangle(
                request.getInt("xEnd"),
                request.getInt("yEnd"),
                request.getInt("xStart"),
                request.getInt("yStart"),
                request.getInt("color"),
                request.getInt("lineWidth")
            );
    
            // Calculate dimensions
            rectangle.RecDemensionCalculate();
    
            System.out.println("Rectangle dimensions: " + rectangle.toJsonObject().toString());
            return ResponseEntity.ok(rectangle.toJsonObject().toString());
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", "Invalid request: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse.toString());
        }
    }
    
}




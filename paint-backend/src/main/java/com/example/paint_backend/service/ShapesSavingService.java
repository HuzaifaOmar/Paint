
package com.example.paint_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.example.paint_backend.dto.ShapeDTO;
import com.example.paint_backend.repository.ShapeRepository;
import com.example.paint_backend.shapes.Shape;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class ShapesSavingService {

    private final ShapeRepository shapeRepository;
    private final List<ShapeDTO> shapeDTOs;

    public ShapesSavingService(ShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
        this.shapeDTOs = new ArrayList<>();
    }

    public void createShapeDTOs() {
        shapeDTOs.clear();
        for (Shape shape : shapeRepository.findAll())
            shapeDTOs.add(new ShapeDTO(shape));
    }

    public String getShapeDTOsAsJsonAndXml() {
        try {
            // Convert list to JSON
            ObjectMapper jsonMapper = new ObjectMapper();
            String json = jsonMapper.writeValueAsString(shapeDTOs);

            // Convert list to XML
            XmlMapper xmlMapper = new XmlMapper();
            String xml = xmlMapper.writeValueAsString(shapeDTOs);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("json", json);
            jsonObject.put("xml", xml);
            // Combine JSON and XML in the response
            return jsonObject.toString();

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error generating JSON or XML";
        }
    }

    public void loadJson(List<ShapeDTO> shapeDTOs) {
        try {
            shapeRepository.addAll(shapeDTOs);
        } catch (Exception e) {
            throw new RuntimeException("Error loading JSON", e);
        }
    }

}

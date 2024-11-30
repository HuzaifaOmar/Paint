package com.example.paint_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;



@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle general exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ex.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse("SERVER_ERROR", "An unexpected error occurred.");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle custom exception for not found shapes (e.g., ShapeNotFoundException)
    @ExceptionHandler(ShapeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleShapeNotFound(ShapeNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse("NOT_FOUND", "Shape not found with ID: " + ex.getShapeId());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(InvalidShapeTypeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidShapeTypeException(InvalidShapeTypeException ex) {
        ErrorResponse errorResponse = new ErrorResponse("INVALID_SHAPE_TYPE", ex.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }


    // Handle JSON parsing issues
    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleJsonParseException(org.springframework.http.converter.HttpMessageNotReadableException ex) {
        ErrorResponse errorResponse = new ErrorResponse("BAD_REQUEST", "Invalid JSON format.");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}

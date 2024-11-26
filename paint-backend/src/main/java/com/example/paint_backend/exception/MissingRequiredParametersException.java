package com.example.paint_backend.exception;

public class MissingRequiredParametersException extends RuntimeException {
    public MissingRequiredParametersException(String message) {
        super(message);
    }
}
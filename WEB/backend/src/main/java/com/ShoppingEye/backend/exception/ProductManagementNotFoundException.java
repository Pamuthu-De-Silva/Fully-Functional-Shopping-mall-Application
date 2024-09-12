package com.ShoppingEye.backend.exception;

public class ProductManagementNotFoundException extends RuntimeException {
    public ProductManagementNotFoundException(Long id){
        super("Could not found the user with id"+id);
    }
}

package com.ShoppingEye.backend.exception;

public class UserManagementNotFoundException extends RuntimeException {
  public UserManagementNotFoundException(Long id) {
    super("Could not find the user with id " + id);
  }

  public UserManagementNotFoundException(String username) {
    super("Could not find the user with username " + username);
  }
}

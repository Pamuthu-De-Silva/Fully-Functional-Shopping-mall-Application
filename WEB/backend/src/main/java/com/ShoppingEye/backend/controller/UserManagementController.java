package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.exception.UserManagementNotFoundException;
import com.ShoppingEye.backend.model.UserManagementModel;
import com.ShoppingEye.backend.repository.UserManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserManagementController {

    @Autowired
    private UserManagementRepository userManagementRepository;

    @PostMapping("/usermanagement")
    public ResponseEntity<String> createUser(@RequestBody UserManagementModel newUserManagementModel) {
        if (userManagementRepository.existsByUsername(newUserManagementModel.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken. Please choose a different username.");
        }
        userManagementRepository.save(newUserManagementModel);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");
    }

    @GetMapping("/usermanagement")
    public List<UserManagementModel> getAllUsers() {
        return userManagementRepository.findAll();
    }

    @GetMapping("/usermanagement/id/{id}")
    public ResponseEntity<UserManagementModel> getUserById(@PathVariable Long id) {
        UserManagementModel user = userManagementRepository.findById(id)
                .orElseThrow(() -> new UserManagementNotFoundException(id));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/usermanagement/username/{username}")
    public ResponseEntity<UserManagementModel> getUserByUsername(@PathVariable String username) {
        UserManagementModel user = userManagementRepository.findByUsername(username);
        if (user == null) {
            throw new UserManagementNotFoundException(username);
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/usermanagement/{id}")
    public ResponseEntity<UserManagementModel> updateUser(@RequestBody UserManagementModel updatedUser, @PathVariable Long id) {
        return userManagementRepository.findById(id)
                .map(existingUser -> {
                    // Do not allow username change
                    existingUser.setFullname(updatedUser.getFullname());
                    existingUser.setGmail(updatedUser.getGmail());
                    existingUser.setPassword(updatedUser.getPassword());
                    existingUser.setPhone(updatedUser.getPhone());
                    return ResponseEntity.ok(userManagementRepository.save(existingUser));
                })
                .orElseThrow(() -> new UserManagementNotFoundException(id));
    }


    @DeleteMapping("/usermanagement/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userManagementRepository.existsById(id)) {
            throw new UserManagementNotFoundException(id);
        }
        userManagementRepository.deleteById(id);
        return ResponseEntity.ok("User with id " + id + " deleted.");
    }

    @PostMapping("/login")
    public ResponseEntity<UserManagementModel> loginUser(@RequestBody UserManagementModel loginRequest) {
        UserManagementModel user = userManagementRepository.findByUsername(loginRequest.getUsername());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }


}

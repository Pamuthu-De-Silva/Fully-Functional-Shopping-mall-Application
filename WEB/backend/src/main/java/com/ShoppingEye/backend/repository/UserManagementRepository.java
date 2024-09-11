package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.UserManagementModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserManagementRepository extends JpaRepository<UserManagementModel,Long> {
    UserManagementModel findByUsername(String username);

    boolean existsByUsername(String username);
}

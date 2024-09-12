package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.CartManagementModel;
import com.ShoppingEye.backend.model.UserManagementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartManagementModel, Long> {
    List<CartManagementModel> findByUser(UserManagementModel user);

    List<CartManagementModel> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}

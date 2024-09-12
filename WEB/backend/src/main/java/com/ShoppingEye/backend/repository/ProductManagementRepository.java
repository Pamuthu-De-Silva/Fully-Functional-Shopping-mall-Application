package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.ProductManagementModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductManagementRepository extends JpaRepository<ProductManagementModel,Long> {
}

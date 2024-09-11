package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.CoinModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<CoinModel, Long> {
    // Custom query to find coins by user ID
    CoinModel findByUserId(Long userId);
}

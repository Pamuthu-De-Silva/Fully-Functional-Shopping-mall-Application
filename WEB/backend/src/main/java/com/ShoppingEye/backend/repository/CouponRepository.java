package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.CouponModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<CouponModel, Long> {

    Optional<CouponModel> findByCouponCode(String code);
}

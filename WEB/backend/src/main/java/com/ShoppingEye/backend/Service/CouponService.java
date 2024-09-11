package com.ShoppingEye.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public CouponModel createCoupon(CouponModel coupon) {
        return couponRepository.save(coupon);
    }

    public List<CouponModel> getAllCoupons() {
        return couponRepository.findAll();
    }

    public CouponModel getCouponById(Long id) {
        return couponRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found"));
    }

    public CouponModel updateCoupon(Long id, CouponModel updatedCoupon) {
        CouponModel existingCoupon = getCouponById(id);

        existingCoupon.setCouponName(updatedCoupon.getCouponName());
        existingCoupon.setDescription(updatedCoupon.getDescription());
        existingCoupon.setPrice(updatedCoupon.getPrice());
        existingCoupon.setStartDate(updatedCoupon.getStartDate());
        existingCoupon.setEndDate(updatedCoupon.getEndDate());

        return couponRepository.save(existingCoupon);
    }

    public void deleteCoupon(Long id) {
        couponRepository.deleteById(id);
    }
}


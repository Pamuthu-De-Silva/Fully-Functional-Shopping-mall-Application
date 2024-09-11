package com.ShoppingEye.backend.exception;

public class CouponNotFoundException extends RuntimeException {
    public CouponNotFoundException(String code) {
        super("Coupon not found with code: " + code);
    }
    public CouponNotFoundException(Long id) {
        super("Coupon not found with id: " + id);
    }
}

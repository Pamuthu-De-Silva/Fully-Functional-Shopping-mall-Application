package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.exception.CouponNotFoundException;
import com.ShoppingEye.backend.model.CouponModel;
import com.ShoppingEye.backend.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @PostMapping("/coupon")
    public CouponModel newCouponModel(@RequestBody CouponModel newCouponModel) {
        return couponRepository.save(newCouponModel);
    }

    @GetMapping("/coupon")
    public List<CouponModel> getAllCoupons() {
        return couponRepository.findAll();
    }

    @GetMapping("/coupon/{id}")
    public CouponModel getCouponById(@PathVariable Long id) {
        return couponRepository.findById(id)
                .orElseThrow(() -> new CouponNotFoundException(id));
    }

    @PutMapping("/coupon/{id}")
    public CouponModel updateCoupon(@RequestBody CouponModel newCouponModel, @PathVariable Long id) {
        return couponRepository.findById(id)
                .map(coupon -> {
                    coupon.setCouponCode(newCouponModel.getCouponCode());
                    coupon.setCouponName(newCouponModel.getCouponName());
                    coupon.setDescription(newCouponModel.getDescription());
                    coupon.setPrice(newCouponModel.getPrice());
                    coupon.setStartDate(newCouponModel.getStartDate());
                    coupon.setEndDate(newCouponModel.getEndDate());
                    return couponRepository.save(coupon);
                })
                .orElseThrow(() -> new CouponNotFoundException(id));
    }

    @DeleteMapping("/coupon/{id}")
    public String deleteCoupon(@PathVariable Long id) {
        if (!couponRepository.existsById(id)) {
            throw new CouponNotFoundException(id);
        }
        couponRepository.deleteById(id);
        return "Coupon with id " + id + " deleted.";
    }

    @GetMapping("/coupon/validate/{code}")
    public CouponModel validateCoupon(@PathVariable String code) {
        return couponRepository.findByCouponCode(code)
                .orElseThrow(() -> new CouponNotFoundException("Invalid coupon code: " + code));
    }
}

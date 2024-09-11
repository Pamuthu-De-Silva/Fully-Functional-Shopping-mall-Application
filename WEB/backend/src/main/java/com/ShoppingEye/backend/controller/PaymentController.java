package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.model.PaymentModel;
import com.ShoppingEye.backend.model.CoinModel;
import com.ShoppingEye.backend.repository.PaymentRepository;
import com.ShoppingEye.backend.repository.UserManagementRepository;
import com.ShoppingEye.backend.repository.CoinRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserManagementRepository userRepository;

    @Autowired
    private CoinRepository coinRepository;

    @PostMapping("/process")
    public PaymentModel processPayment(@RequestBody PaymentRequest request) {
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var payment = new PaymentModel();
        payment.setUser(user);
        payment.setAddress(request.getAddress());
        payment.setCardnumber(request.getCardnumber());
        payment.setCvv(request.getCvv());
        payment.setExpdate(request.getExpdate());
        payment.setCardholdername(request.getCardholdername());
        payment.setTotalPrice(request.getTotalPrice());

        // Save payment
        payment = paymentRepository.save(payment);

        // Calculate coins
        int coinsToAdd = (int) (request.getTotalPrice() / 100) * 20;

        // Add or update coins
        CoinModel coinModel = coinRepository.findByUserId(request.getUserId());
        if (coinModel == null) {
            coinModel = new CoinModel();
            coinModel.setUser(user);
            coinModel.setCoinCount(coinsToAdd);
        } else {
            coinModel.setCoinCount(coinModel.getCoinCount() + coinsToAdd);
        }
        coinRepository.save(coinModel);

        return payment;
    }
    @GetMapping
    public List<PaymentModel> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public PaymentModel getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
    }
    public static class PaymentRequest {
        private Long userId;
        private String address;
        private String cardnumber;
        private String cvv;
        private String expdate;
        private String cardholdername;
        private Double totalPrice;  // Add totalPrice field

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getCardnumber() {
            return cardnumber;
        }

        public void setCardnumber(String cardnumber) {
            this.cardnumber = cardnumber;
        }

        public String getCvv() {
            return cvv;
        }

        public void setCvv(String cvv) {
            this.cvv = cvv;
        }

        public String getExpdate() {
            return expdate;
        }

        public void setExpdate(String expdate) {
            this.expdate = expdate;
        }

        public String getCardholdername() {
            return cardholdername;
        }

        public void setCardholdername(String cardholdername) {
            this.cardholdername = cardholdername;
        }

        public Double getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(Double totalPrice) {
            this.totalPrice = totalPrice;
        }
    }


}

package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.model.CoinModel;
import com.ShoppingEye.backend.repository.CoinRepository;
import com.ShoppingEye.backend.repository.UserManagementRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private UserManagementRepository userRepository;

    @PostMapping("/add")
    public CoinModel addCoins(@RequestBody CoinRequest request) {
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CoinModel coinModel = coinRepository.findByUserId(request.getUserId());

        if (coinModel == null) {
            coinModel = new CoinModel();
            coinModel.setUser(user);
            coinModel.setCoinCount(request.getCoinCount());
        } else {
            coinModel.setCoinCount(coinModel.getCoinCount());
        }

        return coinRepository.save(coinModel);
    }

    @PutMapping("/update")
    public CoinModel updateCoins(@RequestBody CoinRequest request) {
        var coinModel = coinRepository.findByUserId(request.getUserId());

        if (coinModel == null) {
            throw new EntityNotFoundException("Coins record not found");
        }

        coinModel.setCoinCount(request.getCoinCount());
        return coinRepository.save(coinModel);
    }

    @DeleteMapping("/delete/{userId}")
    public void deleteCoins(@PathVariable Long userId) {
        var coinModel = coinRepository.findByUserId(userId);

        if (coinModel == null) {
            throw new EntityNotFoundException("Coins record not found");
        }

        coinRepository.delete(coinModel);
    }

    @GetMapping("/get/{userId}")
    public CoinModel getCoins(@PathVariable Long userId) {
        return coinRepository.findByUserId(userId);
    }

    public static class CoinRequest {
        private Long userId;
        private Integer coinCount;

        // Getters and Setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Integer getCoinCount() {
            return coinCount;
        }

        public void setCoinCount(Integer coinCount) {
            this.coinCount = coinCount;
        }
    }

    @PostMapping("/share")
    public String shareCoins(@RequestBody ShareCoinRequest request) {
        var sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new EntityNotFoundException("Sender user not found"));

        var receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new EntityNotFoundException("Receiver user not found"));

        CoinModel senderCoinModel = coinRepository.findByUserId(request.getSenderId());
        if (senderCoinModel == null || senderCoinModel.getCoinCount() < request.getCoinCount()) {
            throw new IllegalArgumentException("Insufficient coins.");
        }

        if (request.getCoinCount() < 20) {
            throw new IllegalArgumentException("Minimum 20 coins must be shared.");
        }

        // Update sender's coins
        senderCoinModel.setCoinCount(senderCoinModel.getCoinCount() - request.getCoinCount());
        coinRepository.save(senderCoinModel);

        // Update receiver's coins
        CoinModel receiverCoinModel = coinRepository.findByUserId(request.getReceiverId());
        if (receiverCoinModel == null) {
            receiverCoinModel = new CoinModel();
            receiverCoinModel.setUser(receiver);
            receiverCoinModel.setCoinCount(request.getCoinCount());
        } else {
            receiverCoinModel.setCoinCount(receiverCoinModel.getCoinCount() + request.getCoinCount());
        }
        coinRepository.save(receiverCoinModel);

        return "Coins shared successfully.";
    }

    public static class ShareCoinRequest {
        private Long senderId;
        private Long receiverId;
        private Integer coinCount;

        // Getters and Setters
        public Long getSenderId() {
            return senderId;
        }

        public void setSenderId(Long senderId) {
            this.senderId = senderId;
        }

        public Long getReceiverId() {
            return receiverId;
        }

        public void setReceiverId(Long receiverId) {
            this.receiverId = receiverId;
        }

        public Integer getCoinCount() {
            return coinCount;
        }

        public void setCoinCount(Integer coinCount) {
            this.coinCount = coinCount;
        }
    }
}

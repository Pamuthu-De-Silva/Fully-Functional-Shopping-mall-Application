package com.ShoppingEye.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CoinModel {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private UserManagementModel user;

    private Integer coinCount;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserManagementModel getUser() {
        return user;
    }

    public void setUser(UserManagementModel user) {
        this.user = user;
    }

    public Integer getCoinCount() {
        return coinCount;
    }

    public void setCoinCount(Integer coinCount) {
        this.coinCount = coinCount;
    }
}

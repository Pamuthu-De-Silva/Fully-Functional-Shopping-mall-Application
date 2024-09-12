package com.ShoppingEye.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartManagementModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserManagementModel user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductManagementModel product;
    private int quantity;

    public CartManagementModel() {}

    public CartManagementModel(UserManagementModel user, ProductManagementModel product, int quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

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

    public ProductManagementModel getProduct() {
        return product;
    }

    public void setProduct(ProductManagementModel product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

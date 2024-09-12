package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.model.CartManagementModel;
import com.ShoppingEye.backend.model.ProductManagementModel;
import com.ShoppingEye.backend.repository.CartItemRepository;
import com.ShoppingEye.backend.repository.ProductManagementRepository;
import com.ShoppingEye.backend.repository.UserManagementRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/cart")
public class CartItemController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductManagementRepository productManagementRepository;

    @Autowired
    private UserManagementRepository userRepository;

    @PostMapping("/add")
    public CartManagementModel addToCart(@RequestBody CartRequest request) {
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        var product = productManagementRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        var cartItem = new CartManagementModel();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(request.getQuantity());

        return cartItemRepository.save(cartItem);
    }

    @GetMapping("/user/{userId}")
    public List<CartManagementModel> getCartItemsByUserId(@PathVariable Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @PutMapping("/update")
    public CartManagementModel updateCartItem(@RequestBody CartUpdateRequest request) {
        var cartItem = cartItemRepository.findById(request.getCartItemId())
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        var product = productManagementRepository.findById(cartItem.getProduct().getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        int newQuantity = request.getQuantity();

        if (newQuantity <= 0) {
            cartItemRepository.deleteById(request.getCartItemId());
            return null;
        }

        // Ensure that the comparison is with the correct data type
        if (newQuantity <= product.getQuantity()) {
            cartItem.setQuantity(newQuantity);
            return cartItemRepository.save(cartItem);
        } else {
            throw new IllegalArgumentException("Quantity exceeds available stock");
        }
    }

    @DeleteMapping("/delete/{cartItemId}")
    public String deleteCartItem(@PathVariable Long cartItemId) {
        var cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        cartItemRepository.deleteById(cartItemId);
        return "Cart item with id " + cartItemId + " deleted.";
    }

    public static class CartRequest {
        private Long userId;
        private Long productId;
        private int quantity;

        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public static class CartUpdateRequest {
        private Long cartItemId;
        private int quantity;

        // Getters and Setters
        public Long getCartItemId() { return cartItemId; }
        public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }


}

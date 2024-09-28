//package com.ShoppingEye.backend.controller;
//
//import com.ShoppingEye.backend.exception.ProductManagementNotFoundException;
//import com.ShoppingEye.backend.model.ProductManagementModel;
//import com.ShoppingEye.backend.repository.ProductManagementRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@CrossOrigin("http://localhost:3000")
//public class ProductManagementController {
//
//    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";
//
//    @Autowired
//    private ProductManagementRepository ProductManagementRepository;
//
//    @PostMapping("/productmanagement")
//    public ProductManagementModel newProductManagementModel(
//            @RequestParam("itemname") String itemname,
//            @RequestParam("category") String category,
//            @RequestParam("price") String price,
//            @RequestParam("quantity") String quantity,
//            @RequestParam("description") String description,
//            @RequestParam("image") MultipartFile image) throws IOException {
//
//        ProductManagementModel newProduct = new ProductManagementModel();
//        newProduct.setItemname(itemname);
//        newProduct.setCategory(category);
//        newProduct.setPrice(price);
//        newProduct.setQuantity(quantity);
//        newProduct.setDescription(description);
//
//        if (!image.isEmpty()) {
//            String uniqueID = UUID.randomUUID().toString();
//            String originalFilename = image.getOriginalFilename();
//            String fileExtension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
//            String filename = uniqueID + fileExtension;
//            String imagePath = filename;
//            Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + filename));
//            newProduct.setImagePath(imagePath);
//        }
//
//        return ProductManagementRepository.save(newProduct);
//    }
//
//    @GetMapping("/productmanagement")
//    public List<ProductManagementModel> getAllProduct() {
//        return ProductManagementRepository.findAll();
//    }
//
//    @GetMapping("/productmanagement/{id}")
//    public ProductManagementModel getProductById(@PathVariable Long id) {
//        return ProductManagementRepository.findById(id)
//                .orElseThrow(() -> new ProductManagementNotFoundException(id));
//    }
//
//    @PutMapping("/productmanagement/{id}")
//    public ProductManagementModel updateProduct(
//            @PathVariable Long id,
//            @RequestParam("itemname") String itemname,
//            @RequestParam("category") String category,
//            @RequestParam("price") String price,
//            @RequestParam("quantity") String quantity,
//            @RequestParam("description") String description,
//            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
//
//        return ProductManagementRepository.findById(id)
//                .map(product -> {
//                    product.setItemname(itemname);
//                    product.setCategory(category);
//                    product.setPrice(price);
//                    product.setQuantity(quantity);
//                    product.setDescription(description);
//
//                    if (image != null && !image.isEmpty()) {
//                        try {
//                            String uniqueID = UUID.randomUUID().toString();
//                            String originalFilename = image.getOriginalFilename();
//                            String fileExtension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
//                            String filename = uniqueID + fileExtension;
//                            String imagePath = filename;
//                            Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + filename));
//                            product.setImagePath(imagePath);
//                        } catch (IOException e) {
//                            e.printStackTrace();
//                        }
//                    }
//
//                    return ProductManagementRepository.save(product);
//                }).orElseThrow(() -> new ProductManagementNotFoundException(id));
//    }
//
//    @DeleteMapping("/productmanagement/{id}")
//    public String deleteProduct(@PathVariable Long id) {
//        ProductManagementModel product = ProductManagementRepository.findById(id)
//                .orElseThrow(() -> new ProductManagementNotFoundException(id));
//
//        // Delete the associated image file
//        String imagePath = product.getImagePath();
//        if (imagePath != null && !imagePath.isEmpty()) {
//            try {
//                Path filePath = Paths.get(UPLOAD_DIR + imagePath);
//                Files.deleteIfExists(filePath);
//            } catch (IOException e) {
//                e.printStackTrace();
//                // Optionally, handle the error (e.g., log it or return an error message)
//            }
//        }
//
//        // Delete the product data
//        ProductManagementRepository.deleteById(id);
//        return "Product with id " + id + " and associated image deleted.";
//    }
//    @PostMapping("/products/update-quantity")
//    public void updateProductQuantities(@RequestBody List<ProductQuantityUpdateRequest> updates) {
//        for (ProductQuantityUpdateRequest update : updates) {
//            ProductManagementModel product = ProductManagementRepository.findById(update.getProductId())
//                    .orElseThrow(() -> new RuntimeException("Product not found"));
//
//            int newQuantity = product.getQuantity() - update.getQuantity();
//            if (newQuantity < 0) {
//                throw new RuntimeException("Insufficient quantity for product ID: " + update.getProductId());
//            }
//            product.setQuantity(String.valueOf(newQuantity));
//            ProductManagementRepository.save(product);
//        }
//    }
//
//
//    public static class ProductQuantityUpdateRequest {
//        private Long productId;
//        private int quantity;
//
//        public Long getProductId() {
//            return productId;
//        }
//
//        public void setProductId(Long productId) {
//            this.productId = productId;
//        }
//
//        public int getQuantity() {
//            return quantity;
//        }
//
//        public void setQuantity(int quantity) {
//            this.quantity = quantity;
//        }
//    }
//}


package com.ShoppingEye.backend.controller;

import com.ShoppingEye.backend.exception.ProductManagementNotFoundException;
import com.ShoppingEye.backend.model.ProductManagementModel;
import com.ShoppingEye.backend.repository.ProductManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProductManagementController {

    private static final String UPLOAD_DIR = "C:\\Users\\Asus\\Documents\\GitHub\\Fully-Functional-Shopping-mall-Application\\uploads\\";

    @Autowired
    private ProductManagementRepository ProductManagementRepository;

    @PostMapping("/productmanagement")
    public ProductManagementModel newProductManagementModel(
            @RequestParam("itemname") String itemname,
            @RequestParam("category") String category,
            @RequestParam("price") String price,
            @RequestParam("quantity") String quantity,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("seller") String seller) throws IOException {  // New seller parameter

        ProductManagementModel newProduct = new ProductManagementModel();
        newProduct.setItemname(itemname);
        newProduct.setCategory(category);
        newProduct.setPrice(price);
        newProduct.setQuantity(quantity);
        newProduct.setDescription(description);
        newProduct.setSeller(seller);  // Set seller

        if (!image.isEmpty()) {
            String uniqueID = UUID.randomUUID().toString();
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
            String filename = uniqueID + fileExtension;
            String imagePath = filename;
            Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + filename));
            newProduct.setImagePath(imagePath);
        }

        return ProductManagementRepository.save(newProduct);
    }

    @GetMapping("/productmanagement")
    public List<ProductManagementModel> getAllProduct() {
        return ProductManagementRepository.findAll();
    }

    @GetMapping("/productmanagement/{id}")
    public ProductManagementModel getProductById(@PathVariable Long id) {
        return ProductManagementRepository.findById(id)
                .orElseThrow(() -> new ProductManagementNotFoundException(id));
    }

    @PutMapping("/productmanagement/{id}")
    public ProductManagementModel updateProduct(
            @PathVariable Long id,
            @RequestParam("itemname") String itemname,
            @RequestParam("category") String category,
            @RequestParam("price") String price,
            @RequestParam("quantity") String quantity,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("seller") String seller) throws IOException {  // New seller parameter

        return ProductManagementRepository.findById(id)
                .map(product -> {
                    product.setItemname(itemname);
                    product.setCategory(category);
                    product.setPrice(price);
                    product.setQuantity(quantity);
                    product.setDescription(description);
                    product.setSeller(seller);  // Update seller

                    if (image != null && !image.isEmpty()) {
                        try {
                            String uniqueID = UUID.randomUUID().toString();
                            String originalFilename = image.getOriginalFilename();
                            String fileExtension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
                            String filename = uniqueID + fileExtension;
                            String imagePath = filename;
                            Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + filename));
                            product.setImagePath(imagePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                    return ProductManagementRepository.save(product);
                }).orElseThrow(() -> new ProductManagementNotFoundException(id));
    }

    @DeleteMapping("/productmanagement/{id}")
    public String deleteProduct(@PathVariable Long id) {
        ProductManagementModel product = ProductManagementRepository.findById(id)
                .orElseThrow(() -> new ProductManagementNotFoundException(id));

        // Delete the associated image file
        String imagePath = product.getImagePath();
        if (imagePath != null && !imagePath.isEmpty()) {
            try {
                Path filePath = Paths.get(UPLOAD_DIR + imagePath);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // Delete the product data
        ProductManagementRepository.deleteById(id);
        return "Product with id " + id + " and associated image deleted.";
    }

    @GetMapping("/productmanagement/seller/{seller}")
    public List<ProductManagementModel> getProductsBySeller(@PathVariable String seller) {
        return ProductManagementRepository.findBySeller(seller);
    }

    @GetMapping("/sellers")
    public List<String> getAllSellers() {
        return ProductManagementRepository.findDistinctSellers();
    }

    @PostMapping("/products/update-quantity")
    public void updateProductQuantities(@RequestBody List<ProductQuantityUpdateRequest> updates) {
        for (ProductQuantityUpdateRequest update : updates) {
            ProductManagementModel product = ProductManagementRepository.findById(update.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            int newQuantity = product.getQuantity() - update.getQuantity();
            if (newQuantity < 0) {
                throw new RuntimeException("Insufficient quantity for product ID: " + update.getProductId());
            }
            product.setQuantity(String.valueOf(newQuantity));
            ProductManagementRepository.save(product);
        }
    }

    public static class ProductQuantityUpdateRequest {
        private Long productId;
        private int quantity;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}

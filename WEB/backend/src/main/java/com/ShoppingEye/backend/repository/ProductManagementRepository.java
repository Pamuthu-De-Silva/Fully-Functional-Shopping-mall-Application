//package com.ShoppingEye.backend.repository;
//
//import com.ShoppingEye.backend.model.ProductManagementModel;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface ProductManagementRepository extends JpaRepository<ProductManagementModel,Long> {
//}


package com.ShoppingEye.backend.repository;

import com.ShoppingEye.backend.model.ProductManagementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductManagementRepository extends JpaRepository<ProductManagementModel, Long> {
    // Custom query method to find products by seller
    List<ProductManagementModel> findBySeller(String seller);

    // Custom query to fetch distinct sellers
    @Query("SELECT DISTINCT p.seller FROM ProductManagementModel p")
    List<String> findDistinctSellers();
}

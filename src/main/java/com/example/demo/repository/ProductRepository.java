package com.example.demo.repository;


import com.example.demo.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    Product getById(Long id);

    @Query("select p from Product p where p.name like %:keyword%  or p.description like %:keyword% ")
    List<Product>searchProduct(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.category.name = :categoryName")
    List<Product> findProductsByCategoryName(@Param("categoryName") String categoryName);
}

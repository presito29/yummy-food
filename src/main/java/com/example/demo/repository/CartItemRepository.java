package com.example.demo.repository;

import com.example.demo.model.entity.Cart;
import com.example.demo.model.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.id = :itemId AND ci.cart.id = :cartId")
    void deleteCartItemByCartId(Long itemId, Long cartId);


    List<CartItem> findCartItemByCart(Cart cart);


}

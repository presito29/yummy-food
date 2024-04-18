package com.example.demo.service;

import com.example.demo.model.entity.Cart;
import com.example.demo.model.entity.CartItem;
import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.User;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.request_response.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.productService = productService;
    }

    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.getProduct(req.getProductId());

        Cart cart = cartRepository.findByUserId(user.getId());

        for (CartItem cartItem: cart.getItems()) {
            if (cartItem.getProduct().equals(product)) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity, cart);

            }
        }
        CartItem newCartItem = new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());

        newCartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(req.getQuantity())));

        CartItem savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItems().add(savedCartItem);
        cart.setTotal(calculateCartTotalPrice(cart));
        cartRepository.save(cart);
        return savedCartItem;
    }

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity, Cart cart) throws Exception{
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

        if (cartItem.isEmpty()){
            throw new Exception("cart item not found");
        }
        System.out.println(quantity + "Quantity");
        CartItem item = cartItem.get();
        item.setQuantity(quantity);
        BigDecimal totalPrice = new BigDecimal(quantity).multiply(item.getProduct().getPrice());
        item.setTotalPrice(totalPrice);
        CartItem newItem = cartItemRepository.save(item);
        Cart cart1 =  cartRepository.save(cart);


        BigDecimal newPrice = calculateCartTotalPrice(cart1);
        cart1.setTotal(newPrice);
        cartRepository.save(cart1);

        return newItem;
    }

    public BigDecimal calculateCartTotalPrice(Cart cart) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            totalPrice = totalPrice.add(cartItem.getTotalPrice());
        }

        return totalPrice;
    }
    public BigDecimal calculateCartTotalPrice1(Optional<CartItem> cart) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (CartItem cartItem : cart.orElseThrow().getCart().getItems()) {
            totalPrice = totalPrice.add(cartItem.getTotalPrice());
        }
        return totalPrice;
    }
    public CartItem removeCartItem(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByUserId(user.getId());
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("Cart item not found");
        }

        CartItem cartItem = cartItemOptional.get();

        cart.getItems().remove(cartItem);
        Cart saved = cartRepository.save(cart);
        Optional<CartItem> cartItemOptional1 = cartItemRepository.findById(cartItemId);
        BigDecimal totalPrice = calculateCartTotalPrice1(cartItemOptional1);
        cart.setTotal(totalPrice);
        cartRepository.save(cart);

        cartItemRepository.delete(cartItem);
        return cartItem;
    }

    public Cart findCartById(Long id) throws Exception{
        Optional<Cart> cart = cartRepository.findById(id);

        if (cart.isEmpty()){
            throw new Exception("cart not found with id: " + id);
        }
        return cart.get();
    }

    public Cart findCartByUserId(Long userId) throws Exception{

      return cartRepository.findByUserId(userId);
    }

    public Cart clearCart(Long userId) throws Exception{

        Cart cart = findCartByUserId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}

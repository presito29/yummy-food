package com.example.demo.service;


import com.example.demo.model.entity.*;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.response.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    @Autowired
    public OrderService(UserRepository userRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository, AddressRepository addressRepository, CartService cartService) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;

        this.addressRepository = addressRepository;
        this.cartService = cartService;
    }

    public Order createOrder(OrderRequest orderRequest, User user) throws Exception {
        Address shippAddress = orderRequest.getAddress();
        Address savedAddress = addressRepository.save(shippAddress);
        if (!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }
       Order createOrder = new Order();
       createOrder.setUser(user);
       createOrder.setOrderedTime(LocalDateTime.now());
       createOrder.setStatus("PENDING");
       createOrder.setDeliveryAddress(savedAddress);

       Cart cart = cartService.findCartByUserId(user.getId());
       List<OrderItem> orderItems = new ArrayList<>();

       for (CartItem cartItem: cart.getItems()){
           OrderItem orderItem = new OrderItem();
           orderItem.setProduct(cartItem.getProduct());
           orderItem.setQuantity(cartItem.getQuantity());
           orderItem.setTotalPrice(cartItem.getTotalPrice());


           OrderItem savedOrderItem = orderItemRepository.save(orderItem);
           orderItems.add(savedOrderItem);
       }

       createOrder.setOrderItems(orderItems);
       createOrder.setAmount(cartService.calculateCartTotalPrice(cart));

      // Order savedOrder = orderRepository.save(createOrder);
        orderRepository.save(createOrder);

        return createOrder;
    }
    public Order findOrderById (Long id) throws Exception{
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()){
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
    public Order updateOrder(Long orderId, String orderStatus) throws Exception{
        Order order = findOrderById(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")){
            order.setStatus(orderStatus);
            return orderRepository.save(order);
        }

        throw new Exception("Please select a valid order status");
    }

    public void calcelOrder(Long orderId) throws Exception{
        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }

    public List<Order> getUsersOrder(Long userId) throws Exception{
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrderByStatus(String status) throws Exception{
        return orderRepository.findByStatus(status);
    }

    public List<Order> getAll(){
        return orderRepository.findAll();
    }
}

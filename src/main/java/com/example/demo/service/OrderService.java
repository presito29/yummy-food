package com.example.demo.service;


import com.example.demo.model.entity.*;
import com.example.demo.model.view.OrderViewModel;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.request_response.OrderRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        createOrder.setAmount(cartService.calculateCartTotalPrice(cart));
        orderRepository.save(createOrder);

       for (CartItem cartItem: cart.getItems()){
           OrderItem orderItem = new OrderItem();
           orderItem.setProduct(cartItem.getProduct());
           orderItem.setQuantity(cartItem.getQuantity());
           orderItem.setTotalPrice(cartItem.getTotalPrice());
           orderItem.setOrder(createOrder);

           OrderItem savedOrderItem = orderItemRepository.save(orderItem);
           orderItems.add(savedOrderItem);
       }



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

    @Transactional
    public List<OrderViewModel> getUsersOrder(Long userId) throws Exception{
        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream()
                .map(order -> OrderViewModel.builder()
                        .id(order.getId())
                        .orderedTime(order.getOrderedTime())
                        .amount(order.getAmount())
                        .status(order.getStatus())
                        .deliveryAddress(order.getDeliveryAddress())
                        .user(order.getUser())
                        .products(order.getProducts()) // Assuming you have getter method getOrderItems() in Order entity
                        .build())
                .collect(Collectors.toList());
    }

    public List<Order> getOrderByStatus(String status) throws Exception{
        return orderRepository.findByStatus(status);
    }

    public List<Order> getAll(){
        return orderRepository.findAll();
    }
}

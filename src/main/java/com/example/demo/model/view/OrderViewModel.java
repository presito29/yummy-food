package com.example.demo.model.view;

import com.example.demo.model.entity.Address;
import com.example.demo.model.entity.OrderItem;
import com.example.demo.model.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderViewModel {

    private Long id;

    private LocalDateTime orderedTime;

    private BigDecimal amount;

    private String status;

    private Address deliveryAddress;

    private User user;


    private List<OrderItem> products;
}

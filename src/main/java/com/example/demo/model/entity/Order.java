package com.example.demo.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Entity
@JsonIgnoreProperties( ignoreUnknown = true, value = {"orderProducts"})
@Table(name = "orders")
public class Order extends BaseEntity{


    @Column(nullable = false, name = "ordered_order_time")
    private LocalDateTime orderedTime;

    @Column(nullable = false, name = "get_order_time")
    private LocalDateTime getOrderTime;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "status")
    private String status;

    @ManyToOne
    private Address deliveryAddress;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToMany
    private List<OrderItem> orderItems;
}

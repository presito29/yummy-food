package com.example.demo.response;

import lombok.Data;

@Data
public class AddCartItemRequest {

    private Long productId;
    private int quantity;

}

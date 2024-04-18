package com.example.demo.request_response;

import lombok.Data;

@Data
public class AddCartItemRequest {

    private Long productId;
    private int quantity;

}

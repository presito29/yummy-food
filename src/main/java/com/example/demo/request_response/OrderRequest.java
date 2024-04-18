package com.example.demo.request_response;

import com.example.demo.model.entity.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Address address;
}

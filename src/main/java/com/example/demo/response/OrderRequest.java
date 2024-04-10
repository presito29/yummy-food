package com.example.demo.response;

import com.example.demo.model.entity.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Address address;
}

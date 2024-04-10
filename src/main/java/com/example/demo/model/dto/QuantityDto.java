package com.example.demo.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuantityDto {

    private List<Integer> quantity;
}

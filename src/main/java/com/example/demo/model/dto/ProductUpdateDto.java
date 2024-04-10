package com.example.demo.model.dto;


import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateDto {

    private Long id;
    private String name;

    @PositiveOrZero
    private BigDecimal price;

    private String category;

    private int capacity;

    private String description;

}

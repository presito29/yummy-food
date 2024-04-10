package com.example.demo.model.dto;

import com.example.demo.model.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAddDto {

    private Long id;

    @NotNull
    private String name;

    @Positive
    @NotNull
    private BigDecimal price;

    @NotNull
    private String category;

    @NotNull
    private int capacity;

    @NotNull
    private String description;

}

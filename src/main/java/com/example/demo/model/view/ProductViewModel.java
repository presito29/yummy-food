package com.example.demo.model.view;


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
public class ProductViewModel {

    private Long id;

    private String name;

    private BigDecimal price;

    private String category;

    private int capacity;

    private String description;

    private String imagePath;


}

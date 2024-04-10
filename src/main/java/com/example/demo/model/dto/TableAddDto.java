package com.example.demo.model.dto;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TableAddDto {


    private Long id;

    private int capacity;

    private String smokerOrNo;

    private String inside_outside;

}

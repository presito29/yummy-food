package com.example.demo.model.view;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TableViewModel {

    private Long id;

    private int capacity;

    private String smokerOrNo;

    private String inside_outside;
}

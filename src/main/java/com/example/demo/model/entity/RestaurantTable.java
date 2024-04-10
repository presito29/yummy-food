package com.example.demo.model.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties( ignoreUnknown = true, value = {"reservations"})
@Table(name = "tables")
public class RestaurantTable extends BaseEntity{


    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false, name = "smoker_or_no")
    private boolean smokerOrNo;

    @Column(nullable = false, name = "inside_outside")
    private String inside_outside;

    @OneToMany(mappedBy = "table")
    private List<Reservation> reservations;
}

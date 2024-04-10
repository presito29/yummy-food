package com.example.demo.model.dto;


import com.example.demo.validators.time.TimeRange;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationCreateDto {

    @Future(message = "Date cannot be in the past!")
    @DateTimeFormat(style = "yyyy-MM-dd")
    private Date reservationDate;

    @NotNull
    @Future(message = "Time cannot be in the past.")
    @DateTimeFormat(style = "HH:mm")
    @TimeRange(startTime = "16:00", endTime = "22:00")
    private LocalTime reservationTime;

    @NotNull
    @Positive(message = "Capacity cannot be a negative number!")
    private int capacity;

    @NotNull
    private String smokerOrNo;

    @NotNull
    private String inside_outside;
}

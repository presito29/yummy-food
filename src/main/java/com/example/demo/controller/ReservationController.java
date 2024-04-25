package com.example.demo.controller;

import com.example.demo.model.dto.ReservationCreateDto;
import com.example.demo.model.entity.Reservation;
import com.example.demo.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationController {

    private final ReservationService reservationService;


    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/reservation")
    public ResponseEntity<String> makeReservation(@RequestBody ReservationCreateDto reservationCreateDto, @RequestHeader("Authorization") String jwt) {
        try {
            reservationService.reservation(reservationCreateDto, jwt );
            return ResponseEntity.ok("Reservation created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create reservation: " + e.getMessage());
        }
    }

    @GetMapping("/my-reservation")
    public ResponseEntity<List<Reservation>> reservationByJwt(@RequestHeader("Authorization") String jwt) {
        try {
            List<Reservation> reservations = reservationService.getReservationsByUser(jwt);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
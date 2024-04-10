package com.example.demo.controller.admin;

import com.example.demo.model.entity.Product;
import com.example.demo.model.entity.Reservation;
import com.example.demo.model.entity.User;
import com.example.demo.service.ReservationService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/reservation")
public class AdminReservationController {

    private final ReservationService reservationService;
    private final UserService userService;

    @Autowired
    public AdminReservationController(ReservationService reservationService, UserService userService) {
        this.reservationService = reservationService;
        this.userService = userService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllProducts(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(reservationService.getReservations());
    }
}

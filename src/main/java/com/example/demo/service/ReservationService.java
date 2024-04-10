package com.example.demo.service;

import com.example.demo.model.dto.ReservationCreateDto;
import com.example.demo.model.entity.Reservation;
import com.example.demo.model.entity.RestaurantTable;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.TableRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, TableRepository tableRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
        this.userRepository = userRepository;
    }

    public void reservation(ReservationCreateDto reservationCreateDto, String username) {
        String smoker2 = reservationCreateDto.getSmokerOrNo().toLowerCase();
        boolean smoker = (smoker2.equals("smoker") ? true : false);

        List<RestaurantTable> availableTables = tableRepository.findAvailableTables(
                reservationCreateDto.getCapacity(),
                reservationCreateDto.getInside_outside().toLowerCase(),
                smoker,
                reservationCreateDto.getReservationDate(),
                reservationCreateDto.getReservationTime()
        );

        if (!availableTables.isEmpty()) {
            System.out.println(username);
            RestaurantTable selectedTable = availableTables.get(0);

            Reservation reservation = Reservation.builder()
                    .reservationDate(reservationCreateDto.getReservationDate())
                    .reservationTime(reservationCreateDto.getReservationTime())
                    .table(selectedTable)
                    .user(userRepository.getUserByUsername(username))
                    .build();

            reservationRepository.save(reservation);
        } else {
            System.out.println("not found table for your guz");
        }
    }

    public List<Reservation> getReservationsForDate(LocalDate date) {
        return reservationRepository.findByReservationDate(date);

    }
        public List<Reservation> getReservations() {
            return reservationRepository.findAll();



    }

}

package com.example.demo.repository;

import com.example.demo.model.entity.RestaurantTable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<RestaurantTable, Long> {


    @Query("SELECT t " +
            "FROM RestaurantTable t " +
            "LEFT JOIN t.reservations r " +
            "WHERE t.capacity = :requiredCapacity " +
            "AND t.inside_outside = :insideOutside " +
            "AND t.smokerOrNo = :smoking " +
            "AND NOT EXISTS (" +
            "    SELECT 1 " +
            "    FROM Reservation r2 " +
            "    WHERE r2.table = t " +
            "    AND r2.reservationDate = :selectedDate " +
            "    AND r2.reservationTime = :selectedTime" +
            ")")
    List<RestaurantTable> findAvailableTables(
            @Param("requiredCapacity") int requiredCapacity,
            @Param("insideOutside") String insideOutside,
            @Param("smoking") boolean smoking,
            @Param("selectedDate") Date selectedDate,
            @Param("selectedTime") @NotNull @Future(message = "Time cannot be in the past.") LocalTime selectedTime
    );

    Optional<RestaurantTable> findById(Long id);





}

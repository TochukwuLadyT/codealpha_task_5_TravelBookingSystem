package com.ladyt.TravelBookingSystem.repository;


import com.ladyt.TravelBookingSystem.model.FlightBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlightBookingRepository extends JpaRepository<FlightBooking, Long> {


    Optional<FlightBooking> findByBookingConfirmationCode(String confirmationCode);

    List<FlightBooking> findByTravelId(Long id);
}

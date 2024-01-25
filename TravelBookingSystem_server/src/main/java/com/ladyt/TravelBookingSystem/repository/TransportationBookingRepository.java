package com.ladyt.TravelBookingSystem.repository;

import com.ladyt.TravelBookingSystem.model.TransportationBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransportationBookingRepository extends JpaRepository<TransportationBooking, Long> {
    List<TransportationBooking> findByTravelId(Long id);

    Optional<TransportationBooking> findByBookingConfirmationCode(String confirmationCode);
}

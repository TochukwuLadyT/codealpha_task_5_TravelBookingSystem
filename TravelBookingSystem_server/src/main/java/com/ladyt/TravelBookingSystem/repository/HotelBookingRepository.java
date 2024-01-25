package com.ladyt.TravelBookingSystem.repository;

import com.ladyt.TravelBookingSystem.model.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking, Long> {

    List<HotelBooking> findByTravelId(Long id);

    Optional<HotelBooking> findByBookingConfirmationCode(String confirmationCode);
}

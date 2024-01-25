package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.model.FlightBooking;

import java.util.List;

public interface IFlightBookingService {
    List<FlightBooking> getAllFlightBookings();

    FlightBooking findByFlightConfirmationCode(String confirmationCode);

    String saveFlightBooking(Long id, FlightBooking bookingRequest);

    void cancelFlightBooking(Long id);
}

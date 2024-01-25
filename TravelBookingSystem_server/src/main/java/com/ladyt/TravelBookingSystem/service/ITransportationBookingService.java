package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.model.TransportationBooking;

import java.util.List;

public interface ITransportationBookingService {
    List<TransportationBooking> getAllTransportationBookings();

    TransportationBooking findByTransportationConfirmationCode(String confirmationCode);

    String saveTransportationBooking(Long id, TransportationBooking bookingRequest);

    void cancelTransportationBooking(Long id);
}

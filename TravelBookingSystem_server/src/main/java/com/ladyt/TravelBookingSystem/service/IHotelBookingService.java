package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.model.HotelBooking;

import java.util.List;

public interface IHotelBookingService {
    void cancelHotelBooking(Long id);

    String saveHotelBooking(Long id, HotelBooking bookingRequest);

    HotelBooking findByHotelConfirmationCode(String confirmationCode);

    List<HotelBooking> getAllHotelBookings();
}

package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.FlightBooking;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.repository.FlightBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightBookingService  implements  IFlightBookingService {
    private final FlightBookingRepository flightBookingRepository;
    private final ITravelService travelService;


    @Override
    public List<FlightBooking> getAllFlightBookings() {
        return flightBookingRepository.findAll();
    }

    @Override
    public FlightBooking findByFlightConfirmationCode(String confirmationCode) {
        return flightBookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No Booking with the booking code :"+ confirmationCode));
    }

    @Override
    public String saveFlightBooking(Long id, FlightBooking bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Departure date must come before Arrival date");

        }
        Travel flight = travelService.getTravelById(id).get();
        List<FlightBooking> existingBookings = flight.getFlightBookings();
        boolean flightIsAvailable = flightIsAvailable(bookingRequest, existingBookings);
        if (flightIsAvailable) {
            flight.addFlightBooking(bookingRequest);
            flightBookingRepository.save(bookingRequest);

        } else {
            throw new InvalidBookingRequestException("This flight is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean flightIsAvailable(FlightBooking bookingRequest, List<FlightBooking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public void cancelFlightBooking(Long id) {
        flightBookingRepository.deleteById(id);
    }

    public List<FlightBooking> getAllFTravelBookingByTravelId(Long id) {
        return flightBookingRepository.findByTravelId(id);
    }
}

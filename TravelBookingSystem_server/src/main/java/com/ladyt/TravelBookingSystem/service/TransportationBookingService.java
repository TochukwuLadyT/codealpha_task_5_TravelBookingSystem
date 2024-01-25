package com.ladyt.TravelBookingSystem.service;


import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.TransportationBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.repository.HotelBookingRepository;
import com.ladyt.TravelBookingSystem.repository.TransportationBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransportationBookingService implements ITransportationBookingService{
    private final TransportationBookingRepository transportationBookingRepository;
    private final ITravelService travelService;
    @Override
    public List<TransportationBooking> getAllTransportationBookings() {
        return null;
    }

    @Override
    public TransportationBooking findByTransportationConfirmationCode(String confirmationCode) {
        return transportationBookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No Booking with the booking code :"+ confirmationCode));
    }

    @Override
    public String saveTransportationBooking(Long id, TransportationBooking bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Departure date must come before Arrival date");

        }
        Travel transport = travelService.getTravelById(id).get();
        List<TransportationBooking> existingBookings = transport.getTransportationBookings();
        boolean transIsAvailable = transIsAvailable(bookingRequest, existingBookings);
        if(transIsAvailable){
            transport.addTransportationBooking(bookingRequest);
            transportationBookingRepository.save(bookingRequest);

        }else {
            throw new InvalidBookingRequestException("This Transportation is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();

    }

    private boolean transIsAvailable(TransportationBooking bookingRequest, List<TransportationBooking> existingBookings) {
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
    public void cancelTransportationBooking(Long id) {
          transportationBookingRepository.deleteById(id);
    }

    public List<TransportationBooking> getAllTTravelBookingByTravelId(Long id) {
        return transportationBookingRepository.findByTravelId(id);

    }
}

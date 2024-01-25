package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.repository.HotelBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelBookingService implements IHotelBookingService {
    private final HotelBookingRepository hotelBookingRepository;
    private final ITravelService travelService;
    public List<HotelBooking> getAllTravelBookingByTravelId(Long id) {
        return hotelBookingRepository.findByTravelId(id);
    }

    @Override
    public void cancelHotelBooking(Long id) {
        hotelBookingRepository.deleteById(id);
    }

    @Override
    public String saveHotelBooking(Long id, HotelBooking bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");

        }
        Travel room = travelService.getTravelById(id).get();
        List<HotelBooking> existingBookings = room.getHotelBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            room.addHotelBooking(bookingRequest);
            hotelBookingRepository.save(bookingRequest);

        }else {
            throw new InvalidBookingRequestException("This room is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean roomIsAvailable(HotelBooking bookingRequest, List<HotelBooking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );


    }

    @Override
    public HotelBooking findByHotelConfirmationCode(String confirmationCode) {
        return  hotelBookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No Booking with the booking code :"+ confirmationCode));
    }

    @Override
    public List<HotelBooking> getAllHotelBookings() {
        return hotelBookingRepository.findAll();
    }
}

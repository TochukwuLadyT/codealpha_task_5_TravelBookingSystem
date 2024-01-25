package com.ladyt.TravelBookingSystem.controller;


import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.TransportationBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.response.HotelBookingResponse;
import com.ladyt.TravelBookingSystem.response.TransportationBookingResponse;
import com.ladyt.TravelBookingSystem.response.TravelResponse;
import com.ladyt.TravelBookingSystem.service.IHotelBookingService;
import com.ladyt.TravelBookingSystem.service.ITransportationBookingService;
import com.ladyt.TravelBookingSystem.service.ITravelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/transportationBookings")
public class TransportationBookingController {
    private final ITransportationBookingService transportationBookingService;
    private final ITravelService travelService;




    @GetMapping("/all-Bookings")
    public ResponseEntity<List<TransportationBookingResponse>> getAllTransportationBookings(){
        List<TransportationBooking> bookings = transportationBookingService.getAllTransportationBookings();
        List<TransportationBookingResponse> bookingResponses=  new ArrayList<>();
        for (TransportationBooking booking : bookings){
            TransportationBookingResponse bookingResponse = getTransportationBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }


    private TransportationBookingResponse getTransportationBookingResponse(TransportationBooking booking) {
        Travel theTrans= travelService.getTravelById(booking.getTravel().getId()).get();
        TravelResponse trans = new TravelResponse(
                theTrans.getId(), theTrans.getCountry(),
                theTrans.getCityName(),theTrans.getTransportationName(),theTrans.getTransportationType(),
                theTrans.getTransportationPrice());
        return new TransportationBookingResponse(
                booking.getId(), booking.getCheckInDate(),
                booking.getCheckOutDate(),booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), trans);
    }

    @GetMapping("/transportationConfirmation/{confirmationCode}")
    public ResponseEntity<?> getTransportationBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            TransportationBooking booking = transportationBookingService.findByTransportationConfirmationCode(confirmationCode);
            TransportationBookingResponse transportationBookingResponse = getTransportationBookingResponse(booking);
            return ResponseEntity.ok(transportationBookingResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    @PostMapping("/transportation/{travelId}/booking")
    public ResponseEntity<?> saveTransportationBooking(@PathVariable("travelId") Long id,
                                              @RequestBody TransportationBooking bookingRequest){
        try{
            String confirmationCode = transportationBookingService.saveTransportationBooking(
                    id, bookingRequest);
            return ResponseEntity.ok("Transportation Sit booked successfully, Your Transportation booking confirmation code is :"+confirmationCode);
        }catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelTransportationBooking(@PathVariable("bookingId") Long id){
        transportationBookingService.cancelTransportationBooking(id);
    }



}

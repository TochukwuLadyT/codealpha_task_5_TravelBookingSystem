package com.ladyt.TravelBookingSystem.controller;

import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.FlightBooking;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.response.FlightBookingResponse;
import com.ladyt.TravelBookingSystem.response.HotelBookingResponse;
import com.ladyt.TravelBookingSystem.response.TravelResponse;
import com.ladyt.TravelBookingSystem.service.IFlightBookingService;
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
@RequestMapping("/flightBookings")
public class FlightBookingController {
    private final IFlightBookingService flightBookingService;
    private final ITravelService travelService;

    @GetMapping("/all-Bookings")
    public ResponseEntity<List<FlightBookingResponse>> getAllFlightBookings(){
        List<FlightBooking> bookings = flightBookingService.getAllFlightBookings();
        List<FlightBookingResponse> bookingResponses=  new ArrayList<>();
        for (FlightBooking booking : bookings){
            FlightBookingResponse bookingResponse = getFlightBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    private FlightBookingResponse getFlightBookingResponse(FlightBooking booking) {
        Travel theFlight= travelService.getTravelById(booking.getTravel().getId()).get();
        TravelResponse flight = new TravelResponse(
                theFlight.getId(), theFlight.getCountry(),
                theFlight.getCityName(),theFlight.getFlightName(),theFlight.getFlightType(),
                theFlight.getFlightPrice());
        return new FlightBookingResponse(
                booking.getId(), booking.getCheckInDate(),booking.getCheckOutDate(),booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), flight);
    }

    @GetMapping("/flightConfirmation/{confirmationCode}")
    public ResponseEntity<?> getFlightBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            FlightBooking booking = flightBookingService.findByFlightConfirmationCode(confirmationCode);
            FlightBookingResponse flightBookingResponse = getFlightBookingResponse(booking);
            return ResponseEntity.ok(flightBookingResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/flight/{travelId}/booking")
    public ResponseEntity<?> saveFlightBooking(@PathVariable("travelId") Long id,
                                              @RequestBody FlightBooking bookingRequest){
        try{
            String confirmationCode = flightBookingService.saveFlightBooking(
                    id, bookingRequest);
            return ResponseEntity.ok("Flight booked successfully, Your Flight booking confirmation code is :"+confirmationCode);
        }catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelFlightBooking(@PathVariable("bookingId") Long id){
        flightBookingService.cancelFlightBooking(id);
    }



}

package com.ladyt.TravelBookingSystem.controller;

import com.ladyt.TravelBookingSystem.exception.InvalidBookingRequestException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.response.HotelBookingResponse;
import com.ladyt.TravelBookingSystem.response.TravelResponse;
import com.ladyt.TravelBookingSystem.service.IHotelBookingService;
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
@RequestMapping("/hotelBookings")
public class HotelBookingController {
    private final IHotelBookingService hotelBookingService;
    private final ITravelService travelService;


    @GetMapping("/all-Bookings")
    public ResponseEntity<List<HotelBookingResponse>> getAllHotelBookings(){
        List<HotelBooking> bookings = hotelBookingService.getAllHotelBookings();
        List<HotelBookingResponse> bookingResponses=  new ArrayList<>();
        for (HotelBooking booking : bookings){
            HotelBookingResponse bookingResponse = getHotelBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    private HotelBookingResponse getHotelBookingResponse(HotelBooking booking) {
        Travel theRoom = travelService.getTravelById(booking.getTravel().getId()).get();
        TravelResponse room = new TravelResponse(
                  theRoom.getId(), theRoom.getCountry(),
                  theRoom.getCityName(),theRoom.getHotelName(),theRoom.getRoomType(),
                  theRoom.getRoomPrice());
        return new HotelBookingResponse(
                booking.getId(), booking.getCheckInDate(),
                booking.getCheckOutDate(),booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), room);
    }


    @GetMapping("/hotelConfirmation/{confirmationCode}")
    public ResponseEntity<?> getHotelBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
           HotelBooking booking = hotelBookingService.findByHotelConfirmationCode(confirmationCode);
           HotelBookingResponse hotelBookingResponse = getHotelBookingResponse(booking);
           return ResponseEntity.ok(hotelBookingResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/room/{travelId}/booking")
    public ResponseEntity<?> saveHotelBooking(@PathVariable("travelId") Long id,
                                              @RequestBody HotelBooking bookingRequest){
        try{
            String confirmationCode = hotelBookingService.saveHotelBooking(
                    id, bookingRequest);
            return ResponseEntity.ok("Room booked successfully, Your Hotel booking confirmation code is :"+confirmationCode);
        }catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelHotelBooking(@PathVariable("bookingId")Long id){
        hotelBookingService.cancelHotelBooking(id);
    }

}

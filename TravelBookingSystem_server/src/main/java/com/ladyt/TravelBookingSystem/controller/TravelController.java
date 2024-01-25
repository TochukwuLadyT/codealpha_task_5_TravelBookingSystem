package com.ladyt.TravelBookingSystem.controller;


import com.ladyt.TravelBookingSystem.exception.PhotoRetrievalException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.FlightBooking;
import com.ladyt.TravelBookingSystem.model.TransportationBooking;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.model.HotelBooking;
import com.ladyt.TravelBookingSystem.response.TravelResponse;
import com.ladyt.TravelBookingSystem.service.FlightBookingService;
import com.ladyt.TravelBookingSystem.service.HotelBookingService;
import com.ladyt.TravelBookingSystem.service.TransportationBookingService;
import com.ladyt.TravelBookingSystem.service.TravelService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/travel")
public class TravelController {
    private final TravelService travelService;
    private final HotelBookingService travelBookingService;
    private final FlightBookingService travelFBookingService;
    private final TransportationBookingService travelTBookingService;

    @PostMapping("/add/new-travel")
    public ResponseEntity<TravelResponse> addNewTravel(
            @RequestParam("roomPhoto") MultipartFile roomPhoto,
            @RequestParam("flightSitPhoto") MultipartFile flightSitPhoto,
            @RequestParam("transportSitPhoto") MultipartFile transportSitPhoto,
            @RequestParam("cityName") String cityName,
            @RequestParam("country") String country,
            @RequestParam("hotelName") String hotelName,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("flightName") String flightName,
            @RequestParam("flightType") String flightType,
            @RequestParam("flightPrice") BigDecimal flightPrice,
            @RequestParam("transportationName") String transportationName,
            @RequestParam("transportationType") String transportationType,
            @RequestParam("transportationPrice") BigDecimal transportationPrice) throws SQLException, IOException {
        Travel savedTravel = travelService.addNewTravel(roomPhoto, flightSitPhoto,transportSitPhoto,cityName,country,
                hotelName,roomType, roomPrice, flightName,flightType, flightPrice, transportationName, transportationType, transportationPrice);
        TravelResponse response = new TravelResponse(savedTravel.getId(), savedTravel.getCityName(), savedTravel.getCountry(),
                savedTravel.getHotelName(), savedTravel.getRoomType(), savedTravel.getRoomPrice(), savedTravel.getFlightName(),
                savedTravel.getFlightType(), savedTravel.getFlightPrice(),savedTravel.getTransportationName(),
                savedTravel.getTransportationType(), savedTravel.getTransportationPrice());
        return ResponseEntity.ok(response);

    }

    @GetMapping("/country")
    public List<String> getCountry(){
        return travelService.getAllCountry();

    }

    @GetMapping("/cityNameBasedOnCountry")
    public ResponseEntity<List<String>> getCityNameBasedOnCountry(
            @RequestParam("country") String country) {
        List<String> cityNames = travelService.getCityNameBasedOnCountry(country);
        return ResponseEntity.ok(cityNames);
    }

    @GetMapping("/roomTypes")
    public ResponseEntity<List<String>> getRoomTypesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctRoomTypes = travelService.getRoomTypesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctRoomTypes);
    }

    @GetMapping("/flightTypes")
    public ResponseEntity<List<String>> getFlightTypesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctFlightTypes = travelService.getFlightTypesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctFlightTypes);
    }

    @GetMapping("/transportationTypes")
    public ResponseEntity<List<String>> getTransportationTypesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctTransportationTypes = travelService.getTransportationTypesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctTransportationTypes);
    }

    @GetMapping("/hotelNames")
    public ResponseEntity<List<String>> getHotelNamesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctHotelNames = travelService.getHotelNamesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctHotelNames);
    }

    @GetMapping("/flightNames")
    public ResponseEntity<List<String>> getFlightNamesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctFlightNames = travelService.getFlightNamesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctFlightNames);
    }

    @GetMapping("/transportationNames")
    public ResponseEntity<List<String>> getTransportationNamesBasedOnCityAndCountry(
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName) {
        List<String> distinctTransportationNames = travelService.getTransportationNamesBasedOnCityAndCountry(country, cityName);
        return ResponseEntity.ok(distinctTransportationNames);
    }


    @DeleteMapping("/delete/{travelId}")
    public ResponseEntity<Void> deleteTravel(@PathVariable("travelId") Long id){
        travelService.deleteTravel(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{travelId}")
    public ResponseEntity<TravelResponse>updateTravel(@PathVariable("travelId")
                                                      Long id,
                                                      @RequestParam(required = false) String country,
                                                      @RequestParam(required = false) String cityName,
                                                      @RequestParam(required = false) String hotelName,
                                                      @RequestParam(required = false) String roomType,
                                                      @RequestParam(required = false) BigDecimal roomPrice,
                                                      @RequestParam(required = false) String flightName,
                                                      @RequestParam(required = false) String flightType,
                                                      @RequestParam(required = false) BigDecimal flightPrice,
                                                      @RequestParam(required = false) String transportationName,
                                                      @RequestParam(required = false) String transportationType,
                                                      @RequestParam(required = false) BigDecimal transportationPrice,
                                                      @RequestParam(required = false) MultipartFile roomPhoto,
                                                      @RequestParam(required = false) MultipartFile flightSitPhoto,
                                                      @RequestParam(required = false) MultipartFile transportSitPhoto) throws IOException, SQLException {

        byte[] photoBytes = roomPhoto != null && !roomPhoto.isEmpty() ?
           roomPhoto.getBytes():travelService.getRoomPhotoByTravelId(id);
        byte[] photoByte = flightSitPhoto != null && !flightSitPhoto.isEmpty() ?
                flightSitPhoto.getBytes() : travelService.getFlightSitPhotoByTravelId(id);
        byte[] photoByt = transportSitPhoto != null && !transportSitPhoto.isEmpty() ?
                transportSitPhoto.getBytes() : travelService.getTransportSitPhotoByTravelId(id);
        Blob photoBlob = photoBytes != null && photoBytes.length >0 ? new SerialBlob(photoBytes): null;
        Blob photoBlo = photoByte != null && photoByte.length >0 ? new SerialBlob(photoByte): null;
        Blob photoBl = photoByt != null && photoByt.length >0 ? new SerialBlob(photoByt): null;
        Travel theTravel = travelService.updateTravel(id,country,cityName,hotelName,roomType,roomPrice,flightName,flightType,flightPrice,
                transportationName,transportationType,transportationPrice,photoBytes,photoByte,photoByt);
        theTravel.setRoomPhoto(photoBlob);
        theTravel.setFlightSitPhoto(photoBlo);
        theTravel.setTransportSitPhoto(photoBl);
        TravelResponse travelResponse = getTravelResponse(theTravel);

        return  ResponseEntity.ok(travelResponse);

    }

    @GetMapping("/all-travels")
    public ResponseEntity<List<TravelResponse>> getAllTravel() throws SQLException {
        List<Travel> travels = travelService.getAllTravel();
        List<TravelResponse> travelResponses = new ArrayList<>();
        for(Travel travel : travels){
            byte[] photoBytes = travelService.getTravelPhotoByTravelId(travel.getId());
            byte[] photoByte = travelService.getTravelPhotoByTravelId(travel.getId());
            byte[] photoByt = travelService.getTravelPhotoByTravelId(travel.getId());
            if(photoBytes != null && photoBytes.length>0){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setRoomPhoto(base64Photo);
                travelResponses.add(travelResponse);
            }
            if(photoByte != null && photoByte.length>0){
                String base64Photo = Base64.encodeBase64String(photoByte);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setFlightSitPhoto(base64Photo);
                travelResponses.add(travelResponse);
            }
            if(photoByt != null && photoByt.length>0){
                String base64Photo = Base64.encodeBase64String(photoByt);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setTransportSitPhoto(base64Photo);
                travelResponses.add(travelResponse);
            }
        }
        return ResponseEntity.ok(travelResponses);
    }

    @GetMapping("/services/{travelId}")
    public ResponseEntity<Optional<TravelResponse>> getTravelById(@PathVariable("travelId") Long id){
        Optional<Travel> theTravel = travelService.getTravelById(id);
        return theTravel.map(travel -> {
            TravelResponse travelResponse = getTravelResponse(travel);
            return ResponseEntity.ok(Optional.of(travelResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Travel Services not Found"));
    }

    @GetMapping("/available-transportations")
    public ResponseEntity<List<TravelResponse>> getAvailableTransportationSit(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName,
            @RequestParam("transportationName") String transportationName,
            @RequestParam("transportationType") String transportationType){
        List<Travel> availableTransportations = travelService.getAvailableTransportationSit(checkInDate, checkOutDate, country, cityName, transportationName, transportationType);
        List<TravelResponse> travelResponses = new ArrayList<>();
        for (Travel travel : availableTransportations) {
            byte[] photoBytes = travelService.getTransportSitPhotoByTravelId(travel.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setTransportSitPhoto(photoBase64);
                travelResponses.add(travelResponse);
            }
        }
        if(travelResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(travelResponses);
        }
    }

    @GetMapping("/available-flights")
    public ResponseEntity<List<TravelResponse>> getAvailableFlightSits(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName,
            @RequestParam("flightName") String flightName,
            @RequestParam("flightType") String flightType){
        List<Travel> availableFlights = travelService.getAvailableFlightSits(checkInDate, checkOutDate, country, cityName, flightName, flightType);
        List<TravelResponse> travelResponses = new ArrayList<>();
        for (Travel travel : availableFlights) {
            byte[] photoBytes = travelService.getFlightSitPhotoByTravelId(travel.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setFlightSitPhoto(photoBase64);
                travelResponses.add(travelResponse);
            }
        }
        if(travelResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(travelResponses);
        }
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<TravelResponse>> getAvailableHotelRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("country") String country,
            @RequestParam("cityName") String cityName,
            @RequestParam("hotelName") String hotelName,
            @RequestParam("roomType") String roomType) {
        List<Travel> availableRooms = travelService.getAvailableHotelRooms(checkInDate, checkOutDate, country, cityName, hotelName, roomType);
        List<TravelResponse> travelResponses = new ArrayList<>();
        for (Travel travel : availableRooms) {
            byte[] photoBytes = travelService.getRoomPhotoByTravelId(travel.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                TravelResponse travelResponse = getTravelResponse(travel);
                travelResponse.setRoomPhoto(photoBase64);
                travelResponses.add(travelResponse);
            }
        }
        if(travelResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(travelResponses);
        }
    }

    private TravelResponse getTravelResponse(Travel travel) {
//        List<TravelBooking> bookings = getAllTravelBookingByTravelId(travel.getId());
        byte[] photoBytes = null;
        byte[] photoByte = null;
        byte[] photoByt = null;
        Blob photoBlob = travel.getRoomPhoto();
        Blob photoBlo = travel.getFlightSitPhoto();
        Blob photoBl = travel.getTransportSitPhoto();
        if(photoBlob !=null){
            try{
                photoBytes =  photoBlob.getBytes(1, (int) photoBlob.length());
            }catch (SQLException e){
                throw new PhotoRetrievalException("Error getting Photo");
            }
        }
        if(photoBlo !=null){
            try{
                photoByte =  photoBlo.getBytes(1, (int) photoBlo.length());
            }catch (SQLException e){
                throw new PhotoRetrievalException("Error getting Photo");
            }
        }
        if(photoBl !=null){
            try{
                photoByt =  photoBl.getBytes(1, (int) photoBl.length());
            }catch (SQLException e){
                throw new PhotoRetrievalException("Error getting Photo");
            }
        }
        return new TravelResponse(travel.getId(),travel.getCityName(),
                travel.getCountry(),travel.getHotelName(),travel.getRoomType(),travel.getRoomPrice(),
                travel.getFlightName(),travel.getFlightType(),travel.getFlightPrice(),
                travel.getTransportationName(),travel.getTransportationType(),
                travel.getTransportationPrice(), travel.isHotelNameBooked(),travel.isFlightNameBooked(),travel.isTransportationNameBooked(),
                photoBytes,photoByte,photoByt);

    }

    private List<HotelBooking> getAllTravelBookingByTravelId(Long id) {
        return travelBookingService.getAllTravelBookingByTravelId(id);
    }

    private List<FlightBooking> getAllFTravelBookingByTravelId(Long id){
        return travelFBookingService.getAllFTravelBookingByTravelId(id);
    }

    private List<TransportationBooking> getAllTTravelBookingByTravelId(Long id){
        return travelTBookingService.getAllTTravelBookingByTravelId(id);
    }


}

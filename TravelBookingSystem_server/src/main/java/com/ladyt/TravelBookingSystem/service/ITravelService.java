package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.model.Travel;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ITravelService {
    Travel addNewTravel(MultipartFile file1, MultipartFile file2, MultipartFile file3, String cityName, String country,
                        String hotelName, String roomType, BigDecimal roomPrice, String flightName,String flightType, BigDecimal flightPrice,
                        String transportationName, String transportationType, BigDecimal transportationPrice) throws IOException, SQLException;

    List<Travel> getAllTravel();
    List<String> getAllHotelRoomTypes();

    List<String> getAllFlightTypes();

    List<String> getAllTransportTypes();

    void deleteTravel(Long id);

    Travel updateTravel(Long id, String country, String cityName, String hotelName, String roomType, BigDecimal roomPrice,
                        String flightName, String flightType, BigDecimal flightPrice, String transportationName,String transportationType, BigDecimal transportationPrice,
                        byte[] photoBytes, byte[] photoByte, byte[] photoByt);

    Optional<Travel> getTravelById(Long id);

    List<String> getAllCountry();

    byte[] getRoomPhotoByTravelId(Long id);

    byte[] getFlightSitPhotoByTravelId(Long id);

    byte[] getTransportSitPhotoByTravelId(Long id);

    byte[] getTravelPhotoByTravelId(Long travelId) throws SQLException;

    List<Travel> getAvailableHotelRooms(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String hotelName, String roomType);

    List<Travel> getAvailableFlightSits(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String flightName, String flightType);

    List<Travel> getAvailableTransportationSit(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String transportationName, String transportationType);
}

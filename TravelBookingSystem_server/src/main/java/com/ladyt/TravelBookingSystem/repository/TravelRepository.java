package com.ladyt.TravelBookingSystem.repository;

import com.ladyt.TravelBookingSystem.model.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TravelRepository extends JpaRepository<Travel, Long> {
    @Query("SELECT DISTINCT c.country FROM Travel c")
    List<String> findDistinctionCountry();

    @Query("SELECT DISTINCT l.cityName FROM Travel l WHERE l.country = :country")
    List<String> findCityBasedOnCountry(@Param("country") String country);

    @Query("SELECT DISTINCT t.roomType FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> findRoomTypesBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query("SELECT DISTINCT t.flightType FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> findFlightTypesBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query("SELECT DISTINCT t.transportationType FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> findTransportationBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query("SELECT DISTINCT t.hotelName FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> getHotelNamesBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query("SELECT DISTINCT t.flightName FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> getFlightNamesBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query("SELECT DISTINCT t.transportationName FROM Travel t WHERE t.country = :country AND t.cityName = :cityName")
    List<String> getTransportationNamesBasedOnCityAndCountry(@Param("country") String country, @Param("cityName") String cityName);

    @Query(" SELECT r FROM Travel r " +
            " WHERE r.country LIKE %:country% AND r.cityName LIKE %:cityName% AND " +
            " r.hotelName LIKE %:hotelName% AND r.roomType LIKE %:roomType% "+
            " AND r.id NOT IN (" +
            " SELECT br.travel.id FROM HotelBooking br " +
            " WHERE ((br.checkInDate <= :checkOutDate) AND (br.checkOutDate >= :checkInDate))" +
            ")")
    List<Travel> findAvailableHotelRoomsByQuery(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String hotelName, String roomType);

    @Query(" SELECT r FROM Travel r " +
            " WHERE r.country LIKE %:country% AND r.cityName LIKE %:cityName% AND " +
            " r.flightName LIKE %:flightName% AND r.flightType LIKE %:flightType% "+
            " AND r.id NOT IN (" +
            " SELECT br.travel.id FROM FlightBooking br " +
            " WHERE ((br.checkInDate <= :checkOutDate) AND (br.checkOutDate >= :checkInDate))" +
            ")")
    List<Travel> findAvailableFlightSitsByQuery(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String flightName, String flightType);

    @Query(" SELECT r FROM Travel r " +
            " WHERE r.country LIKE %:country% AND r.cityName LIKE %:cityName% AND " +
            " r.transportationName LIKE %:transportationName% AND r.transportationType LIKE %:transportationType% "+
            " AND r.id NOT IN (" +
            " SELECT br.travel.id FROM TransportationBooking br " +
            " WHERE ((br.checkInDate <= :checkOutDate) AND (br.checkOutDate >= :checkInDate))" +
            ")")
    List<Travel> findAvailableTransportationSitsByQuery(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String transportationName, String transportationType);
}
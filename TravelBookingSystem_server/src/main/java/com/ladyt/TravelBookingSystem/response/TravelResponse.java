package com.ladyt.TravelBookingSystem.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class TravelResponse {
    private Long id;
    private String cityName;
    private String country;
    private String hotelName;
    private String roomType;
    private BigDecimal roomPrice;
    private String flightName;
    private String flightType;
    private BigDecimal flightPrice;
    private String transportationName;
    private String transportationType;
    private BigDecimal transportationPrice;
    private boolean isHotelNameBooked = false;
    private boolean isFlightNameBooked = false;
    private boolean isTransportationNameBooked = false;
    private String roomPhoto;
    private String flightSitPhoto;
    private String transportSitPhoto;

    private List<HotelBookingResponse> bookings;

    public TravelResponse(Long id, String cityName, String country, String hotelName, String roomType, BigDecimal roomPrice, String flightName, String flightType, BigDecimal flightPrice, String transportationName, String transportationType, BigDecimal transportationPrice) {
        this.id = id;
        this.cityName = cityName;
        this.country = country;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.flightName = flightName;
        this.flightType = flightType;
        this.flightPrice = flightPrice;
        this.transportationName = transportationName;
        this.transportationType = transportationType;
        this.transportationPrice = transportationPrice;
    }

    public TravelResponse(Long id, String cityName, String country, String hotelName, String roomType, BigDecimal roomPrice, String flightName, String flightType, BigDecimal flightPrice, String transportationName,
                          String transportationType, BigDecimal transportationPrice, boolean hotelNameBooked,
                          boolean flightNameBooked, boolean transportationNameBooked, byte[] photoBytes, byte[] photoByte, byte[] photoByt) {
        this.id = id;
        this.cityName = cityName;
        this.country = country;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.flightName = flightName;
        this.flightType = flightType;
        this.flightPrice = flightPrice;
        this.transportationName = transportationName;
        this.transportationType = transportationType;
        this.transportationPrice = transportationPrice;
//        this.isHotelNameBooked = isHotelNameBooked;
//        this.isFlightNameBooked = isFlightNameBooked;
//        this.isTransportationNameBooked = isTransportationNameBooked;
        this.roomPhoto = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.flightSitPhoto = photoByte != null ? Base64.encodeBase64String(photoByte) : null;
        this.transportSitPhoto = photoByt != null ? Base64.encodeBase64String(photoByt) : null;

    }


    public TravelResponse(Long id, String country, String cityName, String hotelName, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.cityName = cityName;
        this.country = country;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }
}

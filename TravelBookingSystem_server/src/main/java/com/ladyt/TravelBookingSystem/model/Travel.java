package com.ladyt.TravelBookingSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
public class Travel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Lob
    private Blob roomPhoto;
    @Lob
    private Blob flightSitPhoto;
    @Lob
    private Blob transportSitPhoto;

    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HotelBooking> hotelBookings;

    public Travel(){
        this.hotelBookings =   new ArrayList<>();
        this.flightBookings =   new ArrayList<>();
        this.transportationBookings = new ArrayList<>();
    }

    public void addHotelBooking(HotelBooking booking){
        if (hotelBookings == null){
            hotelBookings = new ArrayList<>();

        }
        hotelBookings.add(booking);
        booking.setTravel(this);
        isHotelNameBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(7);
        booking.setBookingConfirmationCode(bookingCode);
    }

    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FlightBooking> flightBookings;

    public void addFlightBooking(FlightBooking booking){
        if (flightBookings == null){
            flightBookings = new ArrayList<>();

        }
        flightBookings.add(booking);
        booking.setTravel(this);
        isFlightNameBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(7);
        booking.setBookingConfirmationCode(bookingCode);
    }

    @OneToMany(mappedBy = "travel", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TransportationBooking> transportationBookings;

    public void addTransportationBooking(TransportationBooking booking){
        if (transportationBookings == null){
            transportationBookings = new ArrayList<>();

        }
        transportationBookings.add(booking);
        booking.setTravel(this);
        isTransportationNameBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(7);
        booking.setBookingConfirmationCode(bookingCode);
    }






}


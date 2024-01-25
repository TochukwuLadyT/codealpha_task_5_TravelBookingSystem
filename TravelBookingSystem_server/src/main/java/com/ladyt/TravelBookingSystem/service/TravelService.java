package com.ladyt.TravelBookingSystem.service;

import com.ladyt.TravelBookingSystem.exception.InternalServerException;
import com.ladyt.TravelBookingSystem.exception.ResourceNotFoundException;
import com.ladyt.TravelBookingSystem.model.Travel;
import com.ladyt.TravelBookingSystem.repository.TravelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class TravelService implements ITravelService {
    private final TravelRepository travelRepository;
    @Override
    public Travel addNewTravel(MultipartFile file1, MultipartFile file2, MultipartFile file3, String cityName, String country, String hotelName, String roomType, BigDecimal roomPrice, String flightName, String flightType, BigDecimal flightPrice, String transportationName, String transportationType, BigDecimal transportationPrice) throws IOException, SQLException {
        Travel personTravel = new Travel();
        personTravel.setCityName(cityName);
        personTravel.setCountry(country);
        personTravel.setHotelName(hotelName);
        personTravel.setRoomType(roomType);
        personTravel.setRoomPrice(roomPrice);
        personTravel.setFlightName(flightName);
        personTravel.setFlightType(flightType);
        personTravel.setFlightPrice(flightPrice);
        personTravel.setTransportationName(transportationName);
        personTravel.setTransportationType(transportationType);
        personTravel.setTransportationPrice(transportationPrice);
        if (!file1.isEmpty() || !file2.isEmpty() || file3.isEmpty()) {
            byte[] photoByt = file1.getBytes();
            byte[] photoByte = file2.getBytes();
            byte[] photoBytes = file3.getBytes();
            Blob photoBlob = new SerialBlob(photoByt);
            Blob photoBlo = new SerialBlob(photoByte);
            Blob photoBl = new SerialBlob(photoBytes);
            personTravel.setRoomPhoto(photoBlob);
            personTravel.setFlightSitPhoto(photoBlo);
            personTravel.setTransportSitPhoto(photoBl);
        }
        return travelRepository.save(personTravel);
    }

    @Override
    public List<Travel> getAllTravel() {
        return travelRepository.findAll();
    }


    @Override
    public List<String> getAllHotelRoomTypes() {

        return null;
    }

    @Override
    public List<String> getAllFlightTypes() {
        return null;
    }

    @Override
    public List<String> getAllTransportTypes() {
        return null;
    }

    @Override
    public void deleteTravel(Long id) {
        Optional<Travel> theTravel = travelRepository.findById(id);
        if(theTravel.isPresent()){
            travelRepository.deleteById(id);
        }
    }

    @Override
    public Travel updateTravel(Long id, String country, String cityName,String hotelName ,String roomType, BigDecimal roomPrice,
                               String flightName, String flightType, BigDecimal flightPrice, String transportationName, String transportationType, BigDecimal transportationPrice,
                               byte[] photoBytes, byte[] photoByte, byte[] photoByt) {
        Travel serviceTravel = travelRepository.findById(id).get();
        if (country != null) serviceTravel.setCountry(country);
        if (cityName != null) serviceTravel.setCityName(cityName);
        if (hotelName != null) serviceTravel.setHotelName(hotelName);
        if (roomType != null) serviceTravel.setRoomType(roomType);
        if (roomPrice != null) serviceTravel.setRoomPrice(roomPrice);
        if (flightName != null) serviceTravel.setFlightName(flightName);
        if (flightType != null) serviceTravel.setFlightType(flightType);
        if (flightPrice != null) serviceTravel.setRoomPrice(flightPrice);
        if (transportationName != null) serviceTravel.setTransportationName(transportationName);
        if (transportationType != null) serviceTravel.setTransportationType(transportationType);
        if (transportationPrice != null) serviceTravel.setTransportationPrice(transportationPrice);
        if (photoBytes != null && photoBytes.length > 0 || photoByte != null && photoByte.length > 0 ||
                photoByt != null && photoByt.length > 0){
            try{
                serviceTravel.setRoomPhoto(new SerialBlob(photoBytes));
                serviceTravel.setFlightSitPhoto(new SerialBlob(photoByte));
                serviceTravel.setTransportSitPhoto(new SerialBlob(photoByt));
            }catch (SQLException ex){
                throw new InternalServerException("Travel Services not updated");
            }
        }

        return travelRepository.save(serviceTravel);
    }

    @Override
    public List<String> getAllCountry() {
        return travelRepository.findDistinctionCountry();
    }

    @Override
    public byte[] getRoomPhotoByTravelId(Long id) {
        return new byte[0];
    }

    @Override
    public byte[] getFlightSitPhotoByTravelId(Long id) {
        return new byte[0];
    }

    @Override
    public byte[] getTransportSitPhotoByTravelId(Long id) {

        return new byte[0];
    }

    @Override
    public Optional<Travel> getTravelById(Long id) {
        return Optional.of(travelRepository.findById(id).get());
    }

    @Override
    public byte[] getTravelPhotoByTravelId(Long travelId) throws SQLException {
        Optional<Travel> theTravel = travelRepository.findById(travelId);
        if(theTravel.isEmpty()){
            throw new ResourceNotFoundException("No space available");
        }
        Blob photoBlob = theTravel.get().getRoomPhoto();
        Blob photoBlo = theTravel.get().getFlightSitPhoto();
        Blob photoBl = theTravel.get().getTransportSitPhoto();
        if(photoBlob !=null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        if(photoBlo !=null){
            return photoBlo.getBytes(1, (int) photoBlo.length());
        }
        if(photoBl !=null){
            return photoBl.getBytes(1, (int) photoBl.length());
        }
        return null;
    }

    @Override
    public List<Travel> getAvailableHotelRooms(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String hotelName, String roomType) {
        return travelRepository.findAvailableHotelRoomsByQuery(checkInDate, checkOutDate,country,cityName, hotelName, roomType);
    }

    @Override
    public List<Travel> getAvailableFlightSits(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String flightName, String flightType) {
        return travelRepository.findAvailableFlightSitsByQuery(checkInDate, checkOutDate, country, cityName, flightName, flightType);
    }

    @Override
    public List<Travel> getAvailableTransportationSit(LocalDate checkInDate, LocalDate checkOutDate, String country, String cityName, String transportationName, String transportationType) {
        return travelRepository.findAvailableTransportationSitsByQuery(checkInDate,checkOutDate, country, cityName, transportationName, transportationType);
    }

    public List<String> getCityNameBasedOnCountry(String country) {
        return travelRepository.findCityBasedOnCountry(country);
    }

    public List<String> getRoomTypesBasedOnCityAndCountry(String country, String cityName) {
        return travelRepository.findRoomTypesBasedOnCityAndCountry(country, cityName);
    }

    public List<String> getFlightTypesBasedOnCityAndCountry(String country, String cityName) {
        return travelRepository.findFlightTypesBasedOnCityAndCountry(country, cityName);
    }

    public List<String> getTransportationTypesBasedOnCityAndCountry(String country, String cityName) {
        return  travelRepository.findTransportationBasedOnCityAndCountry(country, cityName);
    }

    public List<String> getHotelNamesBasedOnCityAndCountry(String country, String cityName) {
        return travelRepository.getHotelNamesBasedOnCityAndCountry(country, cityName);
    }

    public List<String> getFlightNamesBasedOnCityAndCountry(String country, String cityName) {
        return  travelRepository.getFlightNamesBasedOnCityAndCountry(country, cityName);
    }

    public List<String> getTransportationNamesBasedOnCityAndCountry(String country, String cityName) {
        return travelRepository.getTransportationNamesBasedOnCityAndCountry(country, cityName);
    }
}

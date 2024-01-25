import axios from "axios"

export const api   = axios.create(
    {
        baseURL:"http://localhost:9192"
    }
)

// add new travelservices to the database
export async function addTravel(roomPhoto, flightSitPhoto, transportSitPhoto, cityName,
    country,hotelName,roomType,roomPrice,flightName,flightType,flightPrice,transportationName,transportationType,transportationPrice){
    const formData =  new FormData()
    formData.append("roomPhoto", roomPhoto)
    formData.append("flightSitPhoto", flightSitPhoto)
    formData.append("transportSitPhoto", transportSitPhoto)
    formData.append("cityName", cityName)
    formData.append("country", country)
    formData.append("hotelName", hotelName)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    formData.append("flightName",flightName)
    formData.append("flightType", flightType)
    formData.append("flightPrice", flightPrice)
    formData.append("transportationName", transportationName)
    formData.append("transportationType", transportationType)
    formData.append("transportationPrice", transportationPrice)
    
    const response = await api.post("/travel/add/new-travel", formData)
    if(response.status === 201){
        return true
    }else{
        return false
    }
  
}

//Get saved Country from database
export async function getCountry(){
    try{
        const response = await api.get("/travel/country")
        return response.data
    }catch(error){
        throw new Error("Error fetching Country")
    }
}

// Get saved cityName Based on Selected Country database
export async function getCityName(selectedCountry) {
	const result = await api.get(`/travel/cityNameBasedOnCountry?country=${selectedCountry}`)
	return result
}



//Get saved RoomTypes Based on Selected CityName And Country from database

export async function getRoomTypesForCity(selectedCountry, selectedCity) {
    const result = await api.get(`/travel/roomTypes?country=${selectedCountry}&cityName=${selectedCity}`);
    return result;
}


//Get saved FlightTypes Based on Selected CityName And Country from database

export async function getFlightTypes(selectedCountry, selectedCity) {
	const result = await api.get(`/travel/flightTypes?country=${selectedCountry}&cityName=${selectedCity}`
	)
	return result
}


//Get saved Transportation Types Based on Selected CityName And Country from database

export async function getTransportationTypes(selectedCountry, selectedCity) {
	const result = await api.get(`/travel/transportationTypes?country=${selectedCountry}&cityName=${selectedCity}`
	)
	return result
}

export async function getHotelNames(selectedCountry, selectedCity) {
	const result = await api.get(`/travel/hotelNames?country=${selectedCountry}&cityName=${selectedCity}`
   
	)
	return result
}

export async function getFlightNames(selectedCountry, selectedCity) {
	const result = await api.get(`/travel/flightNames?country=${selectedCountry}&cityName=${selectedCity}`
   
	)
	return result
}

export async function getTransportationNames(selectedCountry, selectedCity) {
	const result = await api.get(`/travel/transportationNames?country=${selectedCountry}&cityName=${selectedCity}`
   
	)
	return result
}


export async function getTravelById(travelId) {
	try {
		const result = await api.get(`/travel/services/${travelId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

export async function updateTravelService(travelId, travelData){
    const formData = new FormData()
    formData.append("roomPhoto", travelData.roomPhoto)
    formData.append("flightSitPhoto", travelData.flightSitPhoto)
    formData.append("transportSitPhoto", travelData.transportSitPhoto)
    formData.append("cityName", travelData.cityName)
    formData.append("country", travelData.country)
    formData.append("hotelName", travelData.hotelName)
    formData.append("roomType", travelData.roomType)
    formData.append("roomPrice", travelData.roomPrice)
    formData.append("flightName", travelData.flightName)
    formData.append("flightType", travelData.flightType)
    formData.append("flightPrice", travelData.flightPrice)
    formData.append("transportationName", travelData.transportationName)
    formData.append("transportationType", travelData.transportationType)
    formData.append("transportationPrice", travelData.transportationPrice)

    const response = await api.put(`/travel/update/${travelId}`, formData,{
    })
    return response
}

/* Deletes a travelService by  Id */
export async function deleteTravelService(travelId) {
	try {
		const result = await api.delete(`travel/delete/${travelId}`, {
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}


//Get saved all travel from database
export async function getAllTravels(){
    try{
        const result = await api.get("/travel/all-travels")
        return result.data
    }catch(error){
        throw new Error("Error fetching Travel Services")
    }
}


//Hotel
//saves new hotel booking in the database
export async function bookHotelRoom(travelId, booking){
    try{
        const response = await api.post(`/hotelBookings/room/${travelId}/booking`, booking)
        return response.data
    }catch(error){
        if(error.response  && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

//gets all hotelbookings from database
export async function getAllHotelBookings(){
    try{
        const result = await api.get(`/hotelBookings/all-Bookings`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching hotel room bookings : ${error.message}`)
    }
}

//gets hotelbooking by the confirmation code
export async function getHotelBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/hotelBookings/hotelConfirmation/${confirmationCode}`)
        return result.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error finding hotel room booking : ${error.message}`)
        }
    }
}

//cancels hotel booking
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/hotelBookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        throw new Error(`Error hotel room cancelling booking : ${error.message}`)
    }

}

///Flight
//saves new flight booking in the database
export async function bookFlightSit(travelId, booking){
    try{
        const response = await api.post(`/flightBookings/flight/${travelId}/booking`, booking)
        return response.data
    }catch(error){
        if(error.response  && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking flight: ${error.message}`)
        }
    }
}

//gets all flightbookings from database
export async function getAllFlightBookings(){
    try{
        const result = await api.get(`/flightBookings/all-Bookings`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching flight bookings : ${error.message}`)
    }
}

//gets flightbooking by the confirmmation cod
export async function getFlightBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/flightBookings/flightConfirmation/${confirmationCode}`)
        return result.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error finding flight booking : ${error.message}`)
        }
    }
}

//cancels flight booking
export async function cancelFlightBooking(bookingId){
    try{
        const result = await api.delete(`/flightBookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        throw new Error(`Error cancelling flight booking : ${error.message}`)
    }

}

///Transportation
//saves new transportation booking in the database
export async function bookTransportationSit(travelId, booking){
    try{
        const response = await api.post(`/transportationBookings/transportation/${travelId}/booking`, booking)
        return response.data
    }catch(error){
        if(error.response  && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking transportation: ${error.message}`)
        }
    }
}

//gets all transportation bookings from database
export async function getAllTransportationBookings(){
    try{
        const result = await api.get(`/transportationBookings/all-Bookings`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching transportation bookings : ${error.message}`)
    }
}

//gets transportation booking by the confirmation code
export async function getTransportationBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/transportationBookings/transportationConfirmation/${confirmationCode}`)
        return result.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error finding transportation booking : ${error.message}`)
        }
    }
}

//cancels transportation booking
export async function cancelTransportationBooking(bookingId){
    try{
        const result = await api.delete(`/transportationBookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        throw new Error(`Error cancelling transportation booking : ${error.message}`)
    }

}


export async function getAvailableHotelRooms(){
    try{
        const result = await api.get("/travel/available-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching Travel Services")
    }
}

export async function getAvailableFlightSits(){
    try{
        const result = await api.get("/travel/available-flights")
        return result.data
    }catch(error){
        throw new Error("Error fetching Travel Services")
    }
}

export async function getAvailableTransportationSit(){
    try{
        const result = await api.get("/travel/available-transportations")
        return result.data
    }catch(error){
        throw new Error("Error fetching Travel Services")
    }
}


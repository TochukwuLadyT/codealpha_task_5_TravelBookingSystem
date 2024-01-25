import React, { useEffect, useState } from 'react'

const HotelSelector = ({handleTravelInputChange, newTravel}) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [hotelNames, setHotelNames]= useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [showNewCountryInput, setShowNewCountryInput] = useState(false)
    const [newCountry, setCountry] = useState("")
    const [showNewCityInput, setShowNewCityInput] = useState(false)
    const [newCity, setCity] = useState("")
    const [showNewHotelNameInput, setShowNewHotelNameInput] = useState(false)
    const [newHotelName, setHotelName] = useState("")
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setRoomType] = useState("")
  
    useEffect(() => {
      // Fetch countries on component mount
         fetch('http://localhost:9192/travel/country')
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error('Error fetching countries:', error));
    }, []);
  
    useEffect(() => {
      // Fetch cities when selectedCountry changes
      if (selectedCountry) {
           fetch(`http://localhost:9192/travel/cityNameBasedOnCountry?country=${selectedCountry}`)  
          .then((response) => response.json())
          .then((data) => setCities(data))
          .catch((error) => console.error('Error fetching cities:', error));
      }
    }, [selectedCountry]);
  
    useEffect(() => {
      // Fetch HotelNames when selectedCountry and selectedCity change
      if (selectedCountry && selectedCity) {
        fetch(`http://localhost:9192/travel/hotelNames?country=${selectedCountry}&cityName=${selectedCity}`)
          .then((response) => response.json())
          .then((data) => setHotelNames(data))
          .catch((error) => console.error('Error fetching hotel name:', error));
      }
    }, [selectedCountry, selectedCity]);

    useEffect(() => {
        // Fetch roomTypes when selectedCountry and selectedCity change
        if (selectedCountry && selectedCity) {
             fetch(`http://localhost:9192/travel/roomTypes?country=${selectedCountry}&cityName=${selectedCity}`)
            //  getCityName
            .then((response) => response.json())
            .then((data) => setRoomTypes(data))
            .catch((error) => console.error('Error fetching roomtypes:', error));
        }
      }, [selectedCountry, selectedCity]);
  
  
    const handleNewCountryInputChange = (e) => {
          setCountry(e.target.value)
      }
  
    const handleAddNewCountry= () => {
          if (newCountry !== "") {
              setCountries([...countries, newCountry])
              setCountry("")
              setShowNewCountryInput(false)
          }
      }
  
    const handleNewCityInputChange = (e) => {
          setCity(e.target.value)
      }
  
    const handleAddNewCity= () => {
          if (newCity !== "") {
              setCities([...cities, newCity])
              setCity("")
              setShowNewCityInput(false)
          }
      }
  
    const handleNewRoomTypeInputChange = (e) => {
          setRoomType(e.target.value)
      }
  
    const handleAddNewRoomType= () => {
          if (newRoomType !== "") {
              setRoomTypes([...roomTypes, newRoomType])
              setRoomType("")
              setShowNewRoomTypeInput(false)
          }
      }
  
    const handleNewHotelNameInputChange = (e) => {
          setHotelName(e.target.value)
      }
  
    const handleAddNewHotelName= () => {
          if (newHotelName !== "") {
              setHotelNames([...hotelNames, newHotelName])
              setHotelName("")
              setShowNewHotelNameInput(false)
          }
      }
  
  
    return (
                <div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label hotel-color">
                    Country
                  </label>
                  <select
                    id="country"
                    required
                    name="country"
                    className="form-select"
                    onChange={(e) => {
                      
                      if (e.target.value === "Add New") {
                        setShowNewCountryInput(true)
                      } else {
                        setSelectedCountry(e.target.value);
                        setSelectedCity(''); 
                        handleTravelInputChange(e)
                      }
  
                    }}
  
                    value={newTravel.selectedCountry}> 
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {showNewCountryInput && (
                              <div className="mt-2">
                                <div className="input-group">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter New Country"
                                      value={newCountry}
                                      onChange={handleNewCountryInputChange}
                                  />
                                  <button className="btn btn-hotel" type="button" onClick={handleAddNewCountry}>
                                      Add
                                  </button>
                              </div>
                          </div>
                      )}
                </div>
                <div className="mb-3">
                  <label htmlFor="cityName" className="form-label hotel-color">
                    City
                  </label>
                  <select
                    id="cityName"
                    required
                    name="cityName"
                    className="form-select"
                    onChange={(e) => {
                      
                      if (e.target.value === "Add New") {
                        setShowNewCityInput(true)
                      } else {
                        setSelectedCity(e.target.value);      
                        handleTravelInputChange(e)
                      }
  
                    }}
  
                    value={newTravel.selectedCity}
                  >
                    <option value="">Select a city</option>
                    {cities.map((cityName, index) => (
                      <option key={index} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
  
                  {showNewCityInput && (
                              <div className="mt-2">
                                <div className="input-group">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter City"
                                      value={newCity}
                                      onChange={handleNewCityInputChange}
                                  />
                                  <button className="btn btn-hotel" type="button" onClick={handleAddNewCity}>
                                      Add
                                  </button>
                              </div>  
                            </div>
                          )}
               </div>
               <div className="mb-3">
                  <label htmlFor="hotelName" className="form-label hotel-color">
                    Hotel Name
                  </label>
                  <select
                    id="hotelName"
                    required
                    name="hotelName"
                    className="form-select"
                    onChange={(e) => {
                      
                      if (e.target.value === "Add New") {
                        setShowNewHotelNameInput(true)
                      } else {
                        handleTravelInputChange(e)
                      }
  
                    }}
  
                    value={newTravel.hotelNames}
                  >
                    <option value="">Select Hotel Name</option>
                    {hotelNames.map((hotelName, index) => (
                      <option key={index} value={hotelName}>
                        {hotelName}
                      </option>
                    ))}
                  </select>
  
                  {showNewHotelNameInput && (
                              <div className="mt-2">
                                <div className="input-group">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Hotel"
                                      value={newHotelName}
                                      onChange={handleNewHotelNameInputChange}
                                  />
                                  <button className="btn btn-hotel" type="button" onClick={handleAddNewHotelName}>
                                      Add
                                  </button>
                              </div>  
                            </div>
                          )}
               </div>
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label hotel-color">
                    Room Type
                  </label>
                  <select 
                  id="roomType" 
                  required
                  name="roomType"
                  className="form-select" 
                  onChange={(e) => {
                    if (e.target.value === "Add New") {
                      setShowNewRoomTypeInput(true)
                    } else {
                      handleTravelInputChange(e)
                    }
                  }}         
  
                  value={newTravel.roomTypes}>
  
                    <option value="">Select a Room Type</option>
                    {roomTypes.map((roomType, index) => (
                      <option key={index} value={roomType}>
                        {roomType}
                      </option>
                    ))}
                  </select>
                  {showNewRoomTypeInput && (
                              <div className="mt-2">
                                <div className="input-group">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter RoomType"
                                      value={newRoomType}
                                      onChange={handleNewRoomTypeInputChange}
                                  />
                                  <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                      Add
                                  </button>
                              </div>  
                            </div>
                          )}
                </div>     
                
              </div>
              );  
}

export default HotelSelector

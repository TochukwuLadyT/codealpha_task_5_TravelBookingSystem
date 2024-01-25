import React, { useEffect, useState } from 'react';

const LocationSelector = ({handleTravelInputChange, newTravel}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [flightTypes, setFlightTypes] = useState([]);
  const [transportationTypes, setTransportationTypes] = useState([]);
  const [hotelNames, setHotelNames]= useState([]);
  const [flightNames, setFlightNames]= useState([]);
  const [transportationNames, setTransportationNames]= useState([]);
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
  const [showNewFlightNameInput, setShowNewFlightNameInput] = useState(false)
  const [newFlightName, setFlightName] = useState("")
  const [showNewFlightTypeInput, setShowNewFlightTypeInput] = useState(false)
  const [newFlightType, setFlightType] = useState("")
  const [showNewTransportationNameInput, setShowNewTransportationNameInput] = useState(false)
  const [newTransportationName, setTransportationName] = useState("")
  const [showNewTransportationTypeInput, setShowNewTransportationTypeInput] = useState(false)
  const [newTransportationType, setTransportationType] = useState("")


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
    // Fetch roomTypes when selectedCountry and selectedCity change
    if (selectedCountry && selectedCity) {
         fetch(`http://localhost:9192/travel/roomTypes?country=${selectedCountry}&cityName=${selectedCity}`)
        .then((response) => response.json())
        .then((data) => setRoomTypes(data))
        .catch((error) => console.error('Error fetching roomtypes:', error));
    }
  }, [selectedCountry, selectedCity]);

  useEffect(() => {
    // Fetch flightTypes when selectedCountry and selectedCity change
    if (selectedCountry && selectedCity) {
      fetch(`http://localhost:9192/travel/flightTypes?country=${selectedCountry}&cityName=${selectedCity}`)
        .then((response) => response.json())
        .then((data) => setFlightTypes(data))
        .catch((error) => console.error('Error fetching flighttype:', error));
    }
  }, [selectedCountry, selectedCity]);

  useEffect(() => {
    // Fetch Transportation Types when selectedCountry and selectedCity change
    if (selectedCountry && selectedCity) {
      fetch(`http://localhost:9192/travel/transportationTypes?country=${selectedCountry}&cityName=${selectedCity}`)
        .then((response) => response.json())
        .then((data) => setTransportationTypes(data))
        .catch((error) => console.error('Error fetching transportationtype:', error));
    }
  }, [selectedCountry, selectedCity]);


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
    // Fetch FlightNames when selectedCountry and selectedCity change
    if (selectedCountry && selectedCity) {
      fetch(`http://localhost:9192/travel/flightNames?country=${selectedCountry}&cityName=${selectedCity}`)
        .then((response) => response.json())
        .then((data) => setFlightNames(data))
        .catch((error) => console.error('Error fetching flight name:', error));
    }
  }, [selectedCountry, selectedCity]);


  useEffect(() => {
    // Fetch TransportationNames when selectedCountry and selectedCity change
    if (selectedCountry && selectedCity) {
      fetch(`http://localhost:9192/travel/transportationNames?country=${selectedCountry}&cityName=${selectedCity}`)
        .then((response) => response.json())
        .then((data) => setTransportationNames(data))
        .catch((error) => console.error('Error fetching transportation name:', error));
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

  const handleNewFlightTypeInputChange = (e) => {
		setFlightType(e.target.value)
	}

  const handleAddNewFlightType= () => {
		if (newFlightType !== "") {
			setFlightTypes([...flightTypes, newFlightType])
			setFlightType("")
			setShowNewFlightTypeInput(false)
		}
	}

  const handleNewTransportationTypeInputChange = (e) => {
		setTransportationType(e.target.value)
	}

  const handleAddNewTransportationType= () => {
		if (newTransportationType !== "") {
			setTransportationTypes([...transportationTypes, newTransportationType])
			setTransportationType("")
			setShowNewTransportationTypeInput(false)
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

  const handleNewFlightNameInputChange = (e) => {
		setFlightName(e.target.value)
	}

  const handleAddNewFlightName= () => {
		if (newFlightName !== "") {
			setFlightNames([...flightNames, newFlightName])
			setFlightName("")
			setShowNewFlightNameInput(false)
		}
	}

  const handleNewTransportationNameInputChange = (e) => {
		setTransportationName(e.target.value)
	}

  const handleAddNewTransportationName= () => {
		if (newTransportationName !== "") {
			setTransportationNames([...transportationNames, newTransportationName])
			setTransportationName("")
			setShowNewTransportationNameInput(false)
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
                  `<option value={"Add New"}>Add New</option>`
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
                  <option value={"Add New"}>Add New</option>
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
                  <option value={"Add New"}>Add New</option>
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
                  <option value={"Add New"}>Add New</option>
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

              <div className="mb-3">
                <label htmlFor="flightName" className="form-label hotel-color">
                  Flight Name
                </label>
                <select
                  id="flightName"
                  required
                  name="flightName"
                  className="form-select"
                  onChange={(e) => {
                    
                    if (e.target.value === "Add New") {
                      setShowNewFlightNameInput(true)
                    } else {
                      handleTravelInputChange(e)
                    }

                  }}

                  value={newTravel.flightNames}
                >
                  <option value="">Select flight Name</option>
                  <option value={"Add New"}>Add New</option>
                  {flightNames.map((flightName, index) => (
                    <option key={index} value={flightName}>
                      {flightName}
                    </option>
                  ))}
                </select>

                {showNewFlightNameInput && (
						    <div className="mt-2">
							  <div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter Flight"
									value={newFlightName}
									onChange={handleNewFlightNameInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewFlightName}>
									Add
								</button>
							</div>  
						  </div>
					    )}
             </div>

              <div className="mb-3">
                <label htmlFor="flightType" className="form-label hotel-color">
                  Flight Type
                </label>
                <select id="flightType" 
                required
                name="flightType"
                className="form-select" 
                onChange={(e) => {
                  if (e.target.value === "Add New") {
                    setShowNewFlightTypeInput(true)
                  } else {
                    handleTravelInputChange(e)
                  }
                }}        
                value={newTravel.flightTypes}>
                  <option value="">Select a Flight Type</option>
                  <option value={"Add New"}>Add New</option>
                  {flightTypes.map((flightType, index) => (
                    <option key={index} value={flightType}>
                      {flightType}
                    </option>
                  ))}
                </select>    
                {showNewFlightTypeInput && (
						    <div className="mt-2">
							  <div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter RoomType"
									value={newFlightType}
									onChange={handleNewFlightTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewFlightType}>
									Add
								</button>
							</div>  
						  </div>
					    )}
              </div>

              <div className="mb-3">
                <label htmlFor="transportationName" className="form-label hotel-color">
                 Transportation Name
                </label>
                <select 
                id="transportationName" 
                required
                name="transportationName"
                className="form-select" 
                onChange={(e) => {
                  if (e.target.value === "Add New") {
                    setShowNewTransportationNameInput(true)
                  } else {
                    handleTravelInputChange(e)
                  }
                }}         

                value={newTravel.transportationNames}>

                  <option value="">Select Transportation Name</option>
                  <option value={"Add New"}>Add New</option>
                  {transportationNames.map((transportationName, index) => (
                    <option key={index} value={transportationName}>
                      {transportationName}
                    </option>
                  ))}
                </select>
                {showNewTransportationNameInput && (
						    <div className="mt-2">
							  <div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter TransportationName"
									value={newTransportationName}
									onChange={handleNewTransportationNameInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewTransportationName}>
									Add
								</button>
							</div>  
						  </div>
					    )}
              </div>
              <div className="mb-3">
                <label htmlFor="transportationType" className="form-label hotel-color">
                  Transportation Type
                </label>
                <select id="transportationType" 
                required
                name="transportationType"
                className="form-select"
                onChange={(e) => {
                  if (e.target.value === "Add New") {
                    setShowNewTransportationTypeInput(true)
                  } else {
                    handleTravelInputChange(e)
                  }
                }}    
                value={newTravel.transportationTypes}>
                  <option value="">Select a Transportation Type</option>
                  <option value={"Add New"}>Add New</option>
                  {transportationTypes.map((transportationType, index) => (
                    <option key={index} value={transportationType}>
                      {transportationType}
                    </option>
                  ))}
                </select>
                {showNewTransportationTypeInput && (
						    <div className="mt-2">
							  <div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter TransportationType"
									value={newTransportationType}
									onChange={handleNewTransportationTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewTransportationType}>
									Add
								</button>
							</div>  
						  </div>
					    )}
              </div>
            </div>
            );  
};

export default LocationSelector;

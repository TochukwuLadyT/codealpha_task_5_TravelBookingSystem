import React, { useState } from 'react'
import { getAvailableHotelRooms } from '../utils/ApiFunctions'
import HotelSelector from './HotelSelector'
import SearchResult from './SearchResult'
import moment from "moment"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

const HotelRoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
		checkInDate: "",
		checkOutDate: "",
        country:"",
        cityName:"",
        hotelName:"",
		roomType: ""
	})
    const [errorMessage, setErrorMessage] = useState("")
	const [availableRooms, setAvailableRooms] = useState([])
	const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
		e.preventDefault()
		const checkInMoment = moment(searchQuery.checkInDate)
		const checkOutMoment = moment(searchQuery.checkOutDate)
		if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
			setErrorMessage("Please enter valid dates")
			return
		}
		if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
			setErrorMessage("Check-out date must be after check-in date")
			return
		}
		setIsLoading(true)
		getAvailableHotelRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.country, searchQuery.cityName, searchQuery.hotelName, searchQuery.roomType)
			.then((response) => {
				setAvailableRooms(response.data)
				setTimeout(() => setIsLoading(false), 2000)
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery({ ...searchQuery, [name]: value })
		const checkInDate = moment(searchQuery.checkInDate)
		const checkOutDate = moment(searchQuery.checkOutDate)
		if (checkInDate.isValid() && checkOutDate.isValid()) {
			setErrorMessage("")
		}
	}
	const handleClearSearch = () => {
		setSearchQuery({
			checkInDate: "",
			checkOutDate: "",
			country:"",
			cityName:"",
			hotelName:"",
			roomType: ""
		})
		setAvailableRooms([])
	}


  return (
    <>
			<Container className="shadow mt-n5 mb-5 py-5 ">
				<Form onSubmit={handleSearch}>
					<Row className="justify-content-center">
						<Col xs={12} md={3}>
							<Form.Group controlId="checkInDate">
								<Form.Label>Check-in Date</Form.Label>
								<Form.Control
									type="date"
									name="checkInDate"
									value={searchQuery.checkInDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="checkOutDate">
								<Form.Label>Check-out Date</Form.Label>
								<Form.Control
									type="date"
									name="checkOutDate"
									value={searchQuery.checkOutDate}
									onChange={handleInputChange}
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>

							</Row>

                        <Col xs={12} md={3}>
							<Form.Group controlId="country">
							
								<div className="d-flex ">
									<HotelSelector
										handleTravelInputChange={handleInputChange}
										newTravel={searchQuery}
									/>
								</div>
							</Form.Group>
						</Col>
						<Button variant="secondary" type="submit" className="ml-2">
										Search
						</Button>
				
				</Form>

				{isLoading ? (
					<p className="mt-4">Finding available rooms....</p>
				) : availableRooms ? (
					<SearchResult results={availableRooms} onClearSearch={handleClearSearch} />
				) : (
					<p className="mt-4">No rooms available for the selected location, dates and room type.</p>
				)}
				{errorMessage && <p className="text-danger">{errorMessage}</p>}
			</Container>
		</>
  )
}

export default HotelRoomSearch

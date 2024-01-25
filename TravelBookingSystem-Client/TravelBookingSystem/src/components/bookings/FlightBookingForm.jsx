import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { bookFlightSit, getTravelById } from '../utils/ApiFunctions'
import FlightBookingSummary from "./FlightBookingSummary";

const FlightBookingForm = () => {
    const [validated, setValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [flightPrice, setFlightPrice] = useState(0);
	const [flightInfo, setFlightInfo] = useState({
          
	     country:"",
         cityName:"",
         flightName:"",
         flightSitPhoto:"",
         flightType:"",
	});

	const [booking, setBooking] = useState({
	  
	  guestFullName: "",
	  guestEmail: "",
	  checkInDate: "",
	  checkOutDate: "",
	  numOfAdults: "",
	  numOfChildren: "",
	});
  
	const { travelId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
	  const fetchFlightInfo = async () => {
		try {
		  const response = await getTravelById(travelId);
		  setFlightInfo(response);
		  setBooking((prevBooking) => ({
			...prevBooking,
		
		  }));
		  setFlightPrice(response.flightPrice);
		} catch (error) {
		  console.error("Error fetching flight information:", error.message);
		}
	  };
  
	  fetchFlightInfo();
	}, [travelId]);
  
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setBooking({ ...booking, [name]: value });
	  setErrorMessage("");
	};


	const getFlightPriceById = async (travelId) => {
		try {
			const response = await getTravelById(travelId)
			setFlightPrice(response.flightPrice )
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getFlightPriceById(travelId)
	}, [travelId])

	const calculatePayment = () => {
		const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = flightPrice ? flightPrice : 0
		return diffInDays * paymentPerDay
	}

	const isGuestCountValid = () => {
		const adultCount = parseInt(booking.numOfAdults)
		const childrenCount = parseInt(booking.numOfChildren)
		const totalCount = adultCount + childrenCount
		return totalCount >= 1 && adultCount >= 1
	}

	const isCheckOutDateValid = () => {
		if (!moment(booking.checkOutDate).isAfter(moment(booking.checkInDate))) {
			setErrorMessage("Departure date must be after Arrival date")
			return false
		} else {
			setErrorMessage("")
			return true
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
			e.stopPropagation()
		} else {
			setIsSubmitted(true)
		}
		setValidated(true)
	}

	const handleFormSubmit = async () => {
		try {
			const confirmationCode = await bookFlightSit(travelId, booking)
			setIsSubmitted(true)
			navigate("/booking-success", { state: { message: confirmationCode } })
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
		}
	}

	return (
		<>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-5">
						<div className="card card-body mt-5">
							<h6 className="card-title">Reserve Flight</h6>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>	   
									<Form.Label htmlFor="guestFullName" className="hotel-color">
										Fullname
									</Form.Label>
									<FormControl
										required
										type="text"
										id="guestFullName"
										name="guestFullName"
										value={booking.guestFullName}
										placeholder="Enter your fullname"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your fullname.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="guestEmail" className="hotel-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="guestEmail"
										name="guestEmail"
										value={booking.guestEmail}
										placeholder="Enter your email"
										onChange={handleInputChange}
										
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email address.
									</Form.Control.Feedback>
								</Form.Group>

								<fieldset style={{ border: "2px" }}><br></br>
									<h6>Lodging Period</h6>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="checkInDate" className="hotel-color">
												Departure
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkInDate"
												name="checkInDate"
												value={booking.checkInDate}
												placeholder="departure-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a Departure date.
											</Form.Control.Feedback>
										</div>

										<div className="col-6">
											<Form.Label htmlFor="checkOutDate" className="hotel-color">
												Arrival
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkOutDate"
												name="checkOutDate"
												value={booking.checkOutDate}
												placeholder="check-out-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a expected arrival date.
											</Form.Control.Feedback>
										</div>
										{errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
									</div>
								</fieldset>

								<fieldset style={{ border: "2px" }}><br></br>
                                <h6>Number of Guest</h6>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="numOfAdults" className="hotel-color">
												Adults
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfAdults"
												name="numOfAdults"
												value={booking.numOfAdults}
												min={1}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select at least 1 adult.
											</Form.Control.Feedback>
										</div>
										<div className="col-6">
											<Form.Label htmlFor="numOfChildren" className="hotel-color">
												Children
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfChildren"
												name="numOfChildren"
												value={booking.numOfChildren}
												placeholder="0"
												min={0}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Select 0 if no children
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<div className="fom-group mt-2 mb-2">
									<button type="submit" className="btn btn-hotel">
										Continue
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-7">
						{isSubmitted && (
							<FlightBookingSummary
								booking={booking}
								payment={calculatePayment()}
								onConfirm={handleFormSubmit}
								isFormValid={validated}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default FlightBookingForm

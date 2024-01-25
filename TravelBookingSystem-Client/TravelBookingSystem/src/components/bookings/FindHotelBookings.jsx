import moment from 'moment'
import React, { useState } from 'react'
import { cancelBooking, getHotelBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindHotelBookings = () => {
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const[isLoading, setIsLoading] = useState(false)
    const[bookingInfo,  setBookingInfo] = useState({
        id:"",
        travel: {id:""},
        bookingConfirmationCode : "",
        roomNumber: "",
        checkInDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })

    const [isDeleted, setIsDeleted] =  useState(false)

    const clearBookingInfo =  {
        id:"",
        travel: {id:""},
        bookingConfirmationCode : "",
        roomNumber: "",
        checkInDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""

    }

const handleInputChange =  (e) => {
    setConfirmationCode(e.target.value)
}

const handleFormSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
        const data = await getHotelBookingByConfirmationCode(confirmationCode)
        setBookingInfo(data)
        setError(null)
    } catch (error) {
        setBookingInfo(clearBookingInfo)
        if (error.response && error.response.status === 404) {
            setError(error.response.data.message)
        } else {
            setError(error.message)
        }
    }

    setTimeout(() => setIsLoading(false), 2000)
}

const handleBookingCancellation = async (bookingId) => {
    try {
        await cancelBooking(bookingInfo.id)
        setIsDeleted(true)
        setSuccessMessage("Booking has been cancelled successfully!")
        setBookingInfo(clearBookingInfo)
        setConfirmationCode("")
        setError(null)
    } catch (error) {
        setError(error.message)
    }
    setTimeout(() => {
        setSuccessMessage("")
        setIsDeleted(false)
    }, 2000)
}


return (
    <>
    <div className="container mt-5 d-flex flex-column 
    justify-content-center align-items-center">
        <h5>My Hotel Bookings</h5>
        <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find booking
                        </button>
                    </div>
                </form>

        {isLoading ? (
                    <div>Finding your booking...</div>
                ) : error ? (
                    <div className="text-danger">Error: {error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Room Number: {bookingInfo.travel.id}</p>
                        <p>Room Type: {bookingInfo.travel.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                                className="btn btn-danger"> 
                                Cancel Booking
                            </button>
    )}
                    </div>
                ) : (
                    <div>find booking...</div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}
                </div>}
               
    
                </div>
        </>
    )
}

export default FindHotelBookings
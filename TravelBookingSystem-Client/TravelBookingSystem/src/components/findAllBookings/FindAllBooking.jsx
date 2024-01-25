import React from 'react'
import { Link } from 'react-router-dom';
const FindAllBooking = () => {
  return (
    <section className="container mt-5" >
        <h5>Select and Find Your Bookings Here</h5><br></br>
        <Link to= {"/find-hotelBookings"}>
          Hotel Bookings
        </Link><br />
        <Link to= {"/find-flightBookings"}>
          Flight Bookings
        </Link><br />
        <Link to= {"/find-transportationBookings"}>
          Transportation Bookings
        </Link><br />
     
    </section>
  )
}

export default FindAllBooking

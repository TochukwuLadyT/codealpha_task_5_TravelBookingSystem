import React from 'react'
import { Link } from 'react-router-dom'


const Admin = () => {
  return (
    <section className="container mt-5" >
        <h5>Welcome to Admin Panel</h5><br></br>
        <Link to= {"/existing-travels"}>
          Manage Travel Services
        </Link><br />
        <Link to= {"/existing-hotelBookings"}>
          Hotel Bookings
        </Link><br />
        <Link to= {"/existing-flightBookings"}>
          Flight Bookings
        </Link><br />
        <Link to= {"/existing-transportationBookings"}>
          Transportation Bookings
        </Link><br />
    </section>
  )
}

export default Admin

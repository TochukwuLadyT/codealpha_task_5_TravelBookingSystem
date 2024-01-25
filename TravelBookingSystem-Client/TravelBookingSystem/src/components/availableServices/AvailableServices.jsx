import React from 'react'
import { Link } from 'react-router-dom'

const AvailableServices = () => {
  return (
    <section className="container mt-5" >
        <h5>Find Available Bookings Here</h5><br></br>
        <Link to= {"/available-roomSearch"}>
          Available Hotels
        </Link><br />
        {/* <Link to= {"/available-flightSearch"}>
          Available Flights
        </Link><br />
        <Link to= {"/available-transportationSearch"}>
        Available Transportations 
        </Link><br />
      */}
    </section>
  )
}

export default AvailableServices

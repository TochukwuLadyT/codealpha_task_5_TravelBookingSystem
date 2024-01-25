import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddTravel from './components/travel/AddTravel'
import EditTravel from './components/travel/EditTravel'
import ExistingTravels from './components/travel/ExistingTravels'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from "./components/layout/Footer"
import NavBar from "./components/layout/Navbar"
import Admin from "./components/admin/Admin"
import TravelListing from './components/travel/TravelListing'
import HotelBookingCheckout from './components/bookings/HotelBookingCheckout'
import HoteBookingSuccess from './components/bookings/HotelBookingSuccess'
import FlightBookingCheckout from './components/bookings/FlightBookingCheckout'
import FlightBookingSuccess from './components/bookings/FlightBookingSuccess'
import TransportationBookingCheckout from './components/bookings/TransportationBookingCheckout'
import TransportationBookingSuccess from './components/bookings/TransportationBookingSuccess'
import HotelBookings from './components/bookings/HotelBookings'
import FlightBookings from './components/bookings/FlightBookings'
import TransportationBookings from './components/bookings/TransportationBookings'
import FindHotelBookings from './components/bookings/FindHotelBookings'
import FindTransportationBookings from './components/bookings/FindTransportationBookings'
import FindFlightBookings from './components/bookings/FindFlightBookings'
import FindAllBooking from './components/findAllBookings/FindAllBooking'
import HotelRoomSearch from './components/common/HotelRoomSearch'
import AvailableServices from './components/availableServices/AvailableServices'

function App() {
  return (
    <>
   <main>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/edit-travel/:travelId" element={<EditTravel/>}/>
        <Route path="/existing-travels" element={<ExistingTravels/>}/>
        <Route path="/add-travel" element={<AddTravel/>}/>
        <Route path="/book-room/:travelId" element={<HotelBookingCheckout/>}/>
        <Route path="/browse-all-travels" element={<TravelListing/>}/>
        <Route path="/booking-success" element={<HoteBookingSuccess/>}/>
        <Route path="/book-flight/:travelId" element={<FlightBookingCheckout/>}/>
        <Route path="/booking-success" element={<FlightBookingSuccess/>}/>
        <Route path="/book-transportation/:travelId" element={<TransportationBookingCheckout/>}/>
        <Route path="/booking-success" element={<TransportationBookingSuccess/>}/>
        <Route path="/existing-hotelBookings" element={<HotelBookings/>}/>
        <Route path="/existing-flightBookings" element={<FlightBookings/>}/>
        <Route path="/existing-transportationBookings" element={<TransportationBookings/>}/>
        <Route path="/find-hotelBookings" element={<FindHotelBookings/>}/>
        <Route path="/find-flightBookings" element={<FindFlightBookings/>}/>
        <Route path="/find-transportationBookings" element={<FindTransportationBookings/>}/>
        <Route path="/findAllBookings" element={<FindAllBooking/>}/>

        <Route path="/available-roomSearch" element={<HotelRoomSearch/>}/>
        {/* <Route path="/available-flightSearch" element={<HotelRoomSearch/>}/>
        <Route path="/available-transportationSearch" element={<HotelRoomSearch/>}/> */}
        <Route path="/available-services" element={<AvailableServices/>}/>

      
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </Router>
    <Footer/>
   </main>
    </>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import FlightBookingTable from './FlightBookingTable'
import { cancelFlightBooking, getAllFlightBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'

const FlightBookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		setTimeout(() => {
			getAllFlightBookings()
				.then((data) => {
					setBookingInfo(data)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error.message)
					setIsLoading(false)
				})
		}, 1000)
	}, [])

	const handleBookingCancellation = async (bookingId) => {
		try {
			await cancelFlightBooking(bookingId)
			const data = await getAllFlightBookings()
			setBookingInfo(data)
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<section style={{ backgroundColor: "whitesmoke" }}>
			<Header title={"Existing Bookings"} />
			{error && <div className="text-danger">{error}</div>}
			{isLoading ? (
				<div>Loading existing bookings</div>
			) : (
				<FlightBookingTable
					bookingInfo={bookingInfo}
					handleBookingCancellation={handleBookingCancellation}
				/>
			)}
		</section>
	)
}

export default FlightBookings

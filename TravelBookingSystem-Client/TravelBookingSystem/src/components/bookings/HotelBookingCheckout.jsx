import React, { useEffect, useState } from 'react'
import { getTravelById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import TravelCarousel from '../common/TravelCarousel'
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt
} from "react-icons/fa"
import HotelBookingForm from './HotelBookingForm'

const HotelBookingCheckout = () => {
  const[error, setError] = useState("")
  const[isLoading, setIsLoading] = useState(true)
  const[roomInfo, setRoomInfo] = useState({country:"", cityName:"", hotelName:"", roomPhoto:"", roomType:"", roomPrice:""})
 
  const{ travelId } = useParams()

  useEffect(() =>{
    setTimeout(() =>{
      getTravelById(travelId)
      .then((response) =>{
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error) =>{
        setError(error)
        setIsLoading(false)
      })
    }, 2000)
  }, [travelId])
 
 
  return (
    <div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading room information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="room-info">
								<img
									src={`data:image/png;base64,${roomInfo.roomPhoto}`}
									alt="Room photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
									  <tr>
											<th>Country:</th>
											<td>{roomInfo.country}</td>
										</tr>
                    <tr>
											<th>CityName:</th>
											<td>{roomInfo.cityName}</td>
										</tr>
                    <tr>
											<th>hotelName:</th>
											<td>{roomInfo.hotelName}</td>
										</tr>
										<tr>
											<th>Room Type:</th>
											<td>{roomInfo.roomType}</td>
										</tr>
										<tr>
											<th>Price per night:</th>
											<td>${roomInfo.roomPrice}</td>
										</tr>
										<tr>
											<th>Room Service:</th>
											<td>
												<ul className="list-unstyled">
													<li>
														<FaWifi /> Wifi
													</li>
													<li>
														<FaTv /> Netfilx Premium
													</li>
													<li>
														<FaUtensils /> Breakfast
													</li>
													<li>
														<FaWineGlassAlt /> Mini bar refreshment
													</li>
													<li>
														<FaCar /> Car Service
													</li>
													<li>
														<FaParking /> Parking Space
													</li>
													<li>
														<FaTshirt /> Laundry
													</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<HotelBookingForm />
					</div>
				</div>
			</section>
      <div className="container">
				<TravelCarousel/>
			</div>
		</div>
  )
}

export default HotelBookingCheckout

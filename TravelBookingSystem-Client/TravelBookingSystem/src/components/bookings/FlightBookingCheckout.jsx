import React, { useEffect, useState } from 'react'
import FlightBookingForm from './FlightBookingForm'
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
} from "react-icons/fa"
import TravelCarousel from '../common/TravelCarousel'
import { useParams } from 'react-router-dom'
import { getTravelById } from '../utils/ApiFunctions'


const FlightBookingCheckout = () => {
  const[error, setError] = useState("")
  const[isLoading, setIsLoading] = useState(true)
  const[flightInfo, setFlightInfo] = useState({country:"", cityName:"", flightName:"", flightSitPhoto:"", flightType:"", flightPrice:""})
 
  const{ travelId } = useParams()

  useEffect(() =>{
    setTimeout(() =>{
      getTravelById(travelId)
      .then((response) =>{
        setFlightInfo(response)
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
							<p>Loading flight information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="flight-info">
								<img
									src={`data:image/png;base64,${flightInfo.flightSitPhoto}`}
									alt="Flight photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
									  <tr>
											<th>Country:</th>
											<td>{flightInfo.country}</td>
										</tr>
                    <tr>
											<th>CityName:</th>
											<td>{flightInfo.cityName}</td>
										</tr>
                    <tr>
											<th>Flight Name:</th>
											<td>{flightInfo.flightName}</td>
										</tr>
										<tr>
											<th>Flight Type:</th>
											<td>{flightInfo.flightType}</td>
										</tr>
										<tr>
											<th>Flight Price:</th>
											<td>${flightInfo.flightPrice}</td>
										</tr>
										<tr>
											<th>Flight Service:</th>
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
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<FlightBookingForm />
					</div>
				</div>
			</section>
      <div className="container">
				<TravelCarousel/>
			</div>
		</div>
  )
}

export default FlightBookingCheckout

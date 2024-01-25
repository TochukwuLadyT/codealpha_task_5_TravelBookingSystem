import React, { useEffect, useState } from 'react'
import TransportationBookingForm from './TransportationBookingForm'
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt
} from "react-icons/fa"
import TravelCarousel from '../common/TravelCarousel'
import { getTravelById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'

const TransportationBookingCheckout = () => {
  const[error, setError] = useState("")
  const[isLoading, setIsLoading] = useState(true)
  const[transportationInfo, setTransportationInfo] = useState({country:"", cityName:"", transportationName:"", transportSitPhoto:"", transportationType:"", transportationPrice:""})
 
  const{ travelId } = useParams()

  useEffect(() =>{
    setTimeout(() =>{
      getTravelById(travelId)
      .then((response) =>{
        setTransportationInfo(response)
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
            <p>Loading transportation information...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="transportationInfo-info">
              <img
                src={`data:image/png;base64,${transportationInfo.transportSitPhoto}`}
                alt="TransportationInfo photo"
                style={{ width: "100%", height: "200px" }}
              />
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Country:</th>
                    <td>{transportationInfo.country}</td>
                  </tr>
                  <tr>
                    <th>CityName:</th>
                    <td>{transportationInfo.cityName}</td>
                  </tr>
                  <tr>
                    <th>Transportation Name:</th>
                    <td>{transportationInfo.transportationName}</td>
                  </tr>
                  <tr>
                    <th>Transportation Type:</th>
                    <td>{transportationInfo.transportationType}</td>
                  </tr>
                  <tr>
                    <th>Transportation Price:</th>
                    <td>${transportationInfo.transportationPrice}</td>
                  </tr>
                  <tr>
                    <th>Transportation Service:</th>
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
          <TransportationBookingForm />
        </div>
      </div>
    </section>
    <div className="container">
      <TravelCarousel/>
    </div>
  </div>
  )
}

export default TransportationBookingCheckout

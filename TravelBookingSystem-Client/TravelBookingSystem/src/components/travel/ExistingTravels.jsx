import React, { useEffect, useState } from 'react'
import { deleteTravelService, getAllTravels } from '../utils/ApiFunctions'
import { Col, Row } from "react-bootstrap"
import TravelFilter from '../common/TravelFilter'
import TravelPaginator from '../common/TravelPaginator'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"


const ExistingTravels = () => {
    const [travels, setTravels] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [travelsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredTravels, setFilteredTravels] = useState([])
    const [selectedCountry, setSelectedCountry ] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchTravels()
    }, [])

    const fetchTravels = async () => {
        setIsLoading(true)
        try{
            const result = await getAllTravels()
            setTravels(result)
            setIsLoading(false)
        }catch (error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(selectedCountry === ""){
            setFilteredTravels(travels)
        }else{
            const filteredTravels = travels.filter((travel) => travel.country === selectedCountry )
            setFilteredTravels(filteredTravels)
        }
        setCurrentPage(1)
    }, [travels, selectedCountry ])

	
	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const handleDelete = async (travelId) =>{
        try{
            const  result = await deleteTravelService(travelId)
            if(result === ""){
                setSuccessMessage(`Travel Service No ${travelId} was deleted`)
                fetchTravels()
            }else{
                console.error(`Error deleting Travel Service: ${result.message}`)
            }
        }catch (error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    }

    const calculateTotalPages = (filteredTravels, travelsPerPage, travels)=>{
        const totalTravels = filteredTravels.length > 0? filteredTravels.length :  travels.length
        return Math.ceil(totalTravels / travelsPerPage)
    }

    const indexOfLastTravel = currentPage * travelsPerPage
    const indexOfFirstTravel = indexOfLastTravel - travelsPerPage
	const currentCountries = filteredTravels.slice(indexOfFirstTravel, indexOfLastTravel);


  return (
    <>
			<div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

			{isLoading ? (
				<p>Loading existing travel services</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h5>Existing Travel Services</h5>
						</div>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<TravelFilter data={travels} setFilteredData={setFilteredTravels} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">

								<Link to={"/add-travel"}>
									<FaPlus /> Add Travel Service
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
                                    <th>Country</th>
									<th>City Name</th>
									<th>Hotel Name</th>
                                    <th>Room Type</th>
									<th>Room Price</th>
									<th>Flight Name</th>
                                    <th>Flight Type</th>
									<th>Flight Price</th>
									<th>Transportation Name</th>
                                    <th>Transportation Type</th>
									<th>Transportation Price</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentCountries.map((travel) => (
									<tr key={travel.id} className="text-center">
										<td>{travel.id}</td>
                                        <td>{travel.country}</td>
										<td>{travel.cityName}</td>
										<td>{travel.hotelName}</td>
										<td>{travel.roomType}</td>
                                        <td>{travel.roomPrice}</td>
										<td>{travel.flightName}</td>
										<td>{travel.flightType}</td>
										<td>{travel.flightPrice}</td>
										<td>{travel.transportationName}</td>
                                        <td>{travel.transportationType}</td>
										<td>{travel.transportationPrice}</td>
								
										<td className="gap-2">
											<Link to={`/edit-travel/${travel.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(travel.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<TravelPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredTravels, travelsPerPage, travels)}
							onPageChange={handlePaginationClick}
						/>
					</section>
				</>
			)}
		</>
  )
}

export default ExistingTravels

import React, { useEffect, useState } from 'react'
import TravelCard from './TravelCard'
import TravelPaginator from '../common/TravelPaginator'
import TravelFilter from '../common/TravelFilter'
import { Col, Container, Row } from 'react-bootstrap'
import { getAllTravels } from '../utils/ApiFunctions'


const Travels = () => {
    const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [travelsPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getAllTravels()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading travel services.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}



	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(filteredData.length / travelsPerPage)

	const renderTravels = () => {
		const startIndex = (currentPage - 1) * travelsPerPage
		const endIndex = startIndex + travelsPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((travel) => <TravelCard key={travel.id} travel={travel} />)
	}
  return (
    <Container>
			
			<Row>
			
				<Col md={6} className="mb-3 mb-md-0">
					<TravelFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
				
					<TravelPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderTravels()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<TravelPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>

		
	)
  
}

export default Travels

import React from 'react'
import Header from "./Header"
import {
	FaClock,
	FaCocktail,
	FaParking,
	FaSnowflake,
	FaTshirt,
	FaUtensils,
	FaWifi
} from "react-icons/fa"
import { Card, Col, Container, Row } from 'react-bootstrap'


const TravelServices = () => {
    return (
		<>
			<Container className="mb-2">
				<Header title={"Our Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
						<span className="hotel-color"> Travel Booking System- </span>Hotel
						<span className="gap-2">
							<FaClock className="ml-5" /> 24-Hour. Book at Your Choice Location
						</span>
					</h4>
				</Row>
				<hr />

				<Row xs={1} md={2} lg={3} className="g-4 mt-2">
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaWifi /> WiFi
								</Card.Title>
								<Card.Text>Experience Comfortable Travel </Card.Text>
							</Card.Body>
						</Card>
					</Col>
				
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaTshirt /> Saftey
								</Card.Title>
								<Card.Text>Ensures safe travelling.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaCocktail /> Keeps Time
								</Card.Title>
								<Card.Text>Start your journey at the right time</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaUtensils /> Best Food Served
								</Card.Title>
								<Card.Text>Best foods at during your journey.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaParking /> Parking
								</Card.Title>
								<Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaSnowflake /> Air conditioning
								</Card.Title>
								<Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
			<hr />
		</>
	)
}

export default TravelServices

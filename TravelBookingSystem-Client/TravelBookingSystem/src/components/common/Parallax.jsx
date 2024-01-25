import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
    return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Experience Best Travel Services at <span className="hotel-color">Long Life Travel Services</span>
					</h1>
					<h3>Experience Hospitality</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax

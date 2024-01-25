import React, { useEffect, useState } from 'react';
import { getAllTravels } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

const TravelCarousel = () => {
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    title: '',
  });

  useEffect(() => {
    setIsLoading(true);
    getAllTravels()
      .then((data) => {
        setTravels(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading services....</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-1 mt-1 shadow">
      <Link to={'/browse-all-travels'} className="hote-color text-center">
        Browse
      </Link>
      <Container>
        <Carousel indicators={false}>
          {travels.map((travel) => (
            <Carousel.Item key={travel.id}>
              <Row>
                <Col xs={12} md={4} className="mb-4">
                  <Link to={`/book-room/${travel.id}`} className="text-decoration-none">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${travel.roomPhoto}`}
                        alt="Room Photo"
                        className="w-100"
                        style={{ height: '200px' }}
                      />
                      <Card.Body>
                        <Card.Title className="room-price">country: {travel.country}</Card.Title>
                        <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                        <Card.Title className="room-price">Hotel: {travel.hotelName}</Card.Title>
                        <Card.Title className="room-price">Room Type: {travel.roomType}</Card.Title>
                        <Card.Title className="room-price">Price: {travel.roomPrice} / day</Card.Title>
                        <Link
                          to={`/book-room/${travel.id}`}
                          state={{ data: data }}
                          className="btn btn-hotel btn-sm"
                        >
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>

                <Col xs={12} md={4} className="mb-4">
                  <Link to={`/book-flight/${travel.id}`} className="text-decoration-none">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${travel.flightSitPhoto}`}
                        alt="Flight Photo"
                        className="w-100"
                        style={{ height: '200px' }}
                      />
                      <Card.Body>
                        <Card.Title className="room-price">country: {travel.country}</Card.Title>
                        <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                        <Card.Title className="room-price">Flight: {travel.flightName}</Card.Title>
                        <Card.Title className="room-price">Flight Type: {travel.flightType}</Card.Title>
                        <Card.Title className="room-price">Price: {travel.flightPrice}</Card.Title>
                        <Link
                          to={`/book-flight/${travel.id}`}
                          state={{ data: data }}
                          className="btn btn-hotel btn-sm"
                        >
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>

                <Col xs={12} md={4} className="mb-4">
                  <Link to={`/book-transportation/${travel.id}`} className="text-decoration-none">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${travel.transportSitPhoto}`}
                        alt="Transportation Photo"
                        className="w-100"
                        style={{ height: '200px' }}
                      />
                      <Card.Body>
                        <Card.Title className="room-price">country: {travel.country}</Card.Title>
                        <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                        <Card.Title className="room-price">Transport Name: {travel.transportationName}</Card.Title>
                        <Card.Title className="room-price">Transport Type: {travel.transportationType}</Card.Title>
                        <Card.Title className="room-price">Price: {travel.transportationPrice}</Card.Title>
                        <Link
                          to={`/book-transportation/${travel.id}`}
                          state={{ data: data }}
                          className="btn btn-hotel btn-sm"
                        >
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default TravelCarousel;

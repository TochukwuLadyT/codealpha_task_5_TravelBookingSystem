
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TravelCard = ({ travel }) => {

  return (
    <Col key={travel.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className="mb-3">
               <Link to={`/book-room/${travel.id}`} className="text-decoration-none">
                <Card.Img
                  variant="top"
                  src={`data:image/png;base64, ${travel.roomPhoto}`}
                  alt="Room Photo"
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                />
              </Link>
              <div className="flex-grow-1 mt-3">
                <Card.Title className="room-price">country: {travel.country}</Card.Title>
                <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                <Card.Title className="room-price">hotel: {travel.hotelName}</Card.Title>
                <Card.Title className="room-price">Room Type: {travel.roomType}</Card.Title>
                <Card.Title className="room-price">Price: {travel.roomPrice} / day</Card.Title>
                <Link to={`/book-room/${travel.id}`}
                className="btn btn-hotel btn-sm"
                >
                  Book Now
                </Link>
              </div>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Link to={`/book-flight/${travel.id}`}>
                <Card.Img
                  variant="top"
                  src={`data:image/png;base64, ${travel.flightSitPhoto}`}
                  alt="Flight Photo"
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}

                />
              </Link>
              <div className="mt-3">
                <Card.Title className="room-price">country: {travel.country}</Card.Title>
                <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                <Card.Title className="room-price">flight: {travel.flightName}</Card.Title>
                <Card.Title className="room-price">flight Type: {travel.flightType}</Card.Title>
                <Card.Title className="room-price">Price: {travel.flightPrice}</Card.Title>
                <Link to={`/book-flight/${travel.id}`}
                className="btn btn-hotel btn-sm">
                  Book Now
                </Link>
              </div>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Link to={`/book-transportation/${travel.id}`}>
                <Card.Img
                  variant="top"
                  src={`data:image/png;base64, ${travel.transportSitPhoto}`}
                  alt="Transportation Photo"
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                />
              </Link>
              <div className="mt-3">
                <Card.Title className="room-price">country: {travel.country}</Card.Title>
                <Card.Title className="room-price">city: {travel.cityName}</Card.Title>
                <Card.Title className="room-price">Transport Name: {travel.transportationName}</Card.Title>
                <Card.Title className="room-price">Transport Type: {travel.transportationType}</Card.Title>
                <Card.Title className="room-price">Price: {travel.transportationPrice}</Card.Title>
                <Link to={`/book-transportation/${travel.id}`}
                className="btn btn-hotel btn-sm">
                  Book Now
                </Link>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TravelCard;


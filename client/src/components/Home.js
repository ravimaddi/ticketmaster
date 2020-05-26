import React from 'react'
import { Carousel, Container, Row, Col } from 'react-bootstrap'
import './home.css'
function Home() {
  return (
    <div>

      <Carousel className="carousel-fade" >
        <Carousel.Item >
          <img
            className="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
            alt="First slide"

          />
          <Carousel.Caption>
            <h3>All Your Tickets in One Place</h3>
            <p>TicketManager gives you everything you need to manage, allocate and analyze your tickets and events.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(46).jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>All Your Tickets in One Place</h3>
            <p>TicketManager gives you everything you need to manage, allocate and analyze your tickets and events.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(47).jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>All Your Tickets in One Place</h3>
            <p>TicketManager gives you everything you need to manage, allocate and analyze your tickets and events.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className=".container">
        <Row>
          <Col>
            <h3>What we do</h3>
            <p>Everything We Do</p>
            <p>Ticket Management</p>
            <p>Event Management</p>
            <p>Sell Unused Tickets</p>
          </Col>
          <Col>
            <h3>Who we help</h3>
            <p>Sales</p>
            <p>Marketing</p>
            <p>Finance & Compilance</p>
            <p>Ticket Administartion</p>
          </Col>
          <Col>
            <h3>About us</h3>
            <p>Careers</p>
            <p>Awards & Recognition</p>
            <p>News & Press</p>
            <p>Blog</p>
          </Col>
          <Col>
            <h3>Resources</h3>
            <p>When To Use TicketManger</p>
            <p>Testimonials</p>
            <p>Success Stories</p>
            <p>Customer Videos</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
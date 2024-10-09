import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const NavBar = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Nav className="me-auto">
            <Nav.Link href="Employee">Employees</Nav.Link>
            <Nav.Link href="Managers">Managers</Nav.Link>
            <Nav.Link href="Salaries">Salaries Employee</Nav.Link>
            <Nav.Link href="Hourly">Hourly Employee</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
      </Container>
    </Navbar>
    <div><div></div></div>
    </>
  );
};

export default NavBar;

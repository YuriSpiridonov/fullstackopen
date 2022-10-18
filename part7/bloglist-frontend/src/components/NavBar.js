/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedinUser)

  const handleLogout = () => {
    dispatch({ type: 'login/userLogout' })
  }

  const loggedUser = () => {
    return (
      <>
        <>{user.name} logged in </>
        <Button variant="primary" id="logout" onClick={handleLogout}>
          logout
        </Button>
      </>
    )
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="\">B.A.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="\">Blogs</Nav.Link>
              <Nav.Link href="\users">Users</Nav.Link>
            </Nav>
            <Navbar.Text>{loggedUser()}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar

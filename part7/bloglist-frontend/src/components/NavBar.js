/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Nav, NavLink, NavMenu, NavLoggedUser } from './NavbarElements'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedinUser)

  const handleLogout = () => {
    dispatch({ type: 'login/userLogout' })
  }

  const loggedUser = () => {
    return (
      <p>
        {user.name} logged in{' '}
        <button id="logout" onClick={handleLogout}>
          logout
        </button>
      </p>
    )
  }

  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">blogs</NavLink>
          <NavLink to="/users">users</NavLink>
          <NavLoggedUser>{loggedUser()}</NavLoggedUser>
        </NavMenu>
      </Nav>
    </>
  )
}

export default NavBar

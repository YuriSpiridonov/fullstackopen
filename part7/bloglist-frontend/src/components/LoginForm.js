import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

import { loginUser } from '../reducers/login/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      const notification = {
        type: 'notifications/error',
        text: 'wrong credentials',
      }
      dispatch(notification)
      setTimeout(() => {
        dispatch({ type: 'notifications/timeout', text: '' })
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p>
        <em>To continue login into the Application.</em>
      </p>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label className="mt-2">Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label className="mt-2">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            id="login-button"
            variant="primary"
            className="mt-3"
            type="submit"
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm

import React from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteToAdd } from './../reducers/anecdoteReducer'
import { showNotification, timeoutForNotification } from './../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(anecdoteToAdd(content))
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(timeoutForNotification())
      }, 5000
    )
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' // connect
import { anecdoteToAdd } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    // dispatch(anecdoteToAdd(content))
    // dispatch(showNotification(content, 5))
    props.anecdoteToAdd(content)
    props.showNotification(content, 5)
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

const mapDispatchToProps = {
  anecdoteToAdd,
  showNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm // AnecdoteForm
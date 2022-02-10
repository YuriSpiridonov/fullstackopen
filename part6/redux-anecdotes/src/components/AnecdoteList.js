import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from './../reducers/anecdoteReducer'
import { showNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter.filter === '') {
      return state => state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => 
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase()))
  }).sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 10))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
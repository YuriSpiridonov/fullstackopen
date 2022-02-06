import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from './../reducers/anecdoteReducer'

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
  }
  )
  const vote = (id) => {
    dispatch(increaseVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
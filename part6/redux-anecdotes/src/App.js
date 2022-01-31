import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote, anecdoteToAdd } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log(content)
    event.target.newAnecdote.value = ''
    dispatch(anecdoteToAdd(content))
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increaseVote(id))
    // dispatch({
    //   type: 'VOTE',
    //   data: { id }
    // })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
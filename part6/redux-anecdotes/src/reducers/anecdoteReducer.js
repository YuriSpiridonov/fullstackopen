import anecdoteService from '../services/anecdotes'

export const anecdoteToAdd = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(content)
    dispatch({
      type: 'ANECDOTE',
      data: anecdote
    })
  }
}

export const increaseVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.updateAnecdoteVotes(id)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const inintializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ANECDOTE':
      const anecdote = action.data
      return state.concat(anecdote)
    case "INIT":
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const voteAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : voteAnecdote
      )
    default: return state
  }
}

export default reducer
import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const anecdoteToAdd = (content) => {
  console.log(content)
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(content)
    dispatch({
      type: 'ANECDOTE',
      data: anecdote
      // data: asObject(anecdote)
    })
  }
}

export const increaseVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

// export const inintializeAnecdotes = (anecdotes) => {
//   return {
//     type: 'INIT',
//     data: anecdotes
//   }
// }
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
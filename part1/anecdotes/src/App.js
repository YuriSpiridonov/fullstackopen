import React, { useState } from "react"

const Heading = ({ heading }) => <h2>{heading}</h2>

const Paragraf =  ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max( ...votes )
  const mostVotedIndex = votes.indexOf(maxVotes)

  if (maxVotes === 0) {
    return (
      <div>
        <p>no votes yet</p>
      </div>
    )
  }

  return (
    <Paragraf text={anecdotes[mostVotedIndex]} votes={maxVotes} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const setToVoted = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVoted(updatedVotes)
  }

  return (
    <div>
      <Heading heading='Anecdote of the day' />
      <Paragraf text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={setToVoted} text='vote' />
      <Button handleClick={setToSelected} text='next anecdote' />
      <Heading heading='Anecdote with most votes' />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App;

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>has {anecdote.votes} votes</div>
    <br></br>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    <br></br>
  </div>
)

export default Anecdote
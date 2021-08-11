import React, { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// const Statistics = (props) => (

// )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let countAll = 0

  const setToGood = (good) => setGood(good)
  const setToNeutral = (neutral) => setNeutral(neutral)
  const setToBad = (bad) => setBad(bad)
  
  countAll = good + neutral + bad

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={ () => setToGood(good + 1) } text='good' />
      <Button handleClick={ () => setToNeutral(neutral + 1) } text='neutral' />
      <Button handleClick={ () => setToBad(bad + 1) } text='bad' />
      
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {countAll}</p>
      <p>average {(good - bad)/countAll}</p>
      <p>positive {(good/countAll)*100} %</p>
    </div>
  );
}

export default App;

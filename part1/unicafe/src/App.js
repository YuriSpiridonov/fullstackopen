import React, { useState } from "react";

const Heading = ({ header }) => <h2>{header}</h2>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let count =  good + neutral + bad
  let average = (good - bad) / count
  let positive = (good / count) * 100

  if (count === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {count}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (good) => setGood(good)
  const setToNeutral = (neutral) => setNeutral(neutral)
  const setToBad = (bad) => setBad(bad)

  return (
    <div>
      <Heading header='give feedback' />
      <Button handleClick={ () => setToGood(good + 1) } text='good' />
      <Button handleClick={ () => setToNeutral(neutral + 1) } text='neutral' />
      <Button handleClick={ () => setToBad(bad + 1) } text='bad' />

      <Heading header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

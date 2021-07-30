import React, {useState} from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StasticsLine = ({text, value}) => (
  <h2>{text}: {value} </h2>
)

const Feedback = ({ setGood, setNeutral, setBad}) =>(
  <div>
    <h1> Give Feedback </h1>
    <Button text={"good"} onClick={setGood} />
    <Button text={"neutral"} onClick={setNeutral} />
    <Button text={"bad"} onClick={setBad} />
  </div>
)

const calculatePercentage = ( good, total) => good*100/total
const formatPercentage = (number) => String(number) + "%"

const Statistics = ({good, neutral, bad, totals }) => {
  const {totalSum, totalCount} = totals;
  if (totalCount===0){
    return(
      <div>
        <h1> Statistics</h1>
        <h2> No data to show!</h2>
      </div>
    )
  }
  else{
    let average = totalSum/totalCount;
    let percentPositive = formatPercentage(calculatePercentage(good,totalCount));
    return(
      <div>
        <h1> Statistics </h1>
        <StasticsLine text={"Good"} value={good} />
        <StasticsLine text={"Neutral"} value={neutral} />
        <StasticsLine text={"Bad"} value={bad} />
        <StasticsLine text={"All"} value={totalSum} />
        <StasticsLine text={"Average"} value={average} />
        <StasticsLine text={"Positive"} value={percentPositive} />
      </div>
    )  

  }
}


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totals, setTotals] = useState({
    totalCount:0,
    totalSum:0
  })

  const addGood = () => {
    setGood( good + 1 );
    setTotals({
      totalCount:totals.totalCount+1, 
      totalSum:totals.totalSum+1
    })
  }

  const addNeutral = () => {
    setNeutral( neutral + 1 );
    setTotals({
      ...totals,
      totalCount: totals.totalCount+1
    })
  }

  
  const addBad = () => {
    setBad( bad + 1 );
    setTotals({
      totalCount:totals.totalCount+1, 
      totalSum:totals.totalSum-1
    })
  }


  return (
    <div>
      <Feedback setGood={addGood} setNeutral={addNeutral} setBad={addBad} />
      <Statistics good={good} neutral={neutral} bad={bad} totals={totals} />
    </div>
  )
}

export default App

functional
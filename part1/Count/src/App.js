import React, {useState} from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const History = ({allClicks}) => {
  if (allClicks.length === 0){
    return(
      <div>
        Click the buttons
      </div>
    )
  }
  else{
    return(
      <div>
        button press History: {allClicks.join(" ")} 
      </div>
    )
  }
}

const App = (props) => {
  const [left, setLeft]  = useState(0)
  const [right, setRight]  = useState(0)
  const [allClicks, setAll]  = useState([])

  const handleLeftClick = () => {
    setLeft(left + 1)
    setAll(allClicks.concat("L"))
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setAll(allClicks.concat("R"))
  }

  const setNewVal = (value) => () =>{
    setRight(value)
  }

  return (
    <div>
      <button onClick={setNewVal(100)}> </button>
    </div>
  )
}

export default App
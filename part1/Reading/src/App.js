import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  console.log("bra");
  const name = "peter"
  const age = 99
  return(
    <>
      <p>Hello world</p>
      <Hello name="George" age={2+3}/>
      <Hello name={name} age = {age}/>
      <Footer/>

    </>
  )
}

export default App
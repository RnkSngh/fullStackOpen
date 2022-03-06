import React, { useState, useEffect } from 'react'
import PhoneForm from './components/PhoneForm'
import ContactList from './components/ContactList'
import axios from "axios"
import personServices from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( () => {
    personServices.getAll()
    .then( response =>
      setPersons(response)
    )
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkName(newName)){
      const newPerson = {name:newName, number: newNumber}
      personServices.addPerson(newPerson)
        .then(addedPerson =>{
          setPersons(persons.concat(addedPerson))
          setNewName("")
          setNewNumber("")
        }
      )
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleDelete = (id)=>{
    return (
      setPersons(persons.filter(
        (person)=> person.id !== id
      ))
  )};

  const handleErrorFunction = (msg)=>{
    console.log("errorhandled", msg);

    setErrorMessage(msg)
    
    setTimeout( ()=> setErrorMessage(null), 5000
    )
  };

  const checkName = (name) => {
    const matchingName = persons.filter((person) =>
      person.name===name
    )
    if(matchingName.length>0){
      window.alert(`${newName} already in phonebook`);
      return false
    }
    return true
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <PhoneForm  
      handleSubmit={handleSubmit}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newName={newName}
      newNumber={newNumber}/>
      <h2>Numbers</h2>
      <ContactList persons={persons} handleDelete={handleDelete} handleError={handleErrorFunction}/>
    </div>
  )
}

export default App
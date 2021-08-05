import React from 'react'

const PhoneForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber})=>{
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)};

export default PhoneForm
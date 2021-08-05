import React from 'react'
import Contact from './Contact';

const ContactList = ({persons, handleDelete, handleError})=>{
    return (
        persons.map((person) =>
            <Contact key={person.name} person={person} afterDelete={handleDelete} handleError={handleError}/>
        )
)};

export default ContactList
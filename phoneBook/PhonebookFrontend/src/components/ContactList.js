import React from 'react'
import Contact from './Contact';

const ContactList = ({ persons, handleDelete, handleError }) => {
    return (
        persons.map((person) =>
            {
                return<Contact key={person.id} person={person} afterDelete={handleDelete} handleError={handleError} />}
        )
    )
};

export default ContactList
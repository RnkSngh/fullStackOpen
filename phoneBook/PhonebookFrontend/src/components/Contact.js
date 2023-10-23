import React from 'react'
import DeleteContact from './DeleteContact';
import personServices from "../services/persons"

const Contact = ({person, afterDelete, handleError})=>{
    const deleteReq = (id) =>{
        if(window.confirm(`Delete ${person.name} ? `)){
            return personServices.deletePerson(id)
            .then( () => {
                afterDelete(person.id)
            })
        
            .catch( (error) => {
                handleError(`${person.name} was not found`)
                afterDelete(id)
            })
        }
    };

    return (
        <h3> {person.name} : {person.number} <DeleteContact deleteReq={ () => deleteReq(person.id)}/> </h3>
)};

export default Contact
import React from 'react'

const TotalExercises = ({parts})=>{
    const total = parts.reduce((a,b) => (a+b.exercises), 0);
    console.log("totalexercise", total, parts )
    return(
        <h3>Number of exercises {total}</h3>
    )
};

export default TotalExercises
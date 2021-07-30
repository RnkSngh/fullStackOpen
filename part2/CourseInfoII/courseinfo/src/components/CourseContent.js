import React from 'react'
import Part from './Part';

const CourseContent = ({parts}) => {
    console.log(parts)
    return (
        parts.map((part) => 
        <Part key={part.name} part={part} />
        )
)};

export default CourseContent
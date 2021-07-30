import React from 'react'
import CourseHeader from './CourseHeader'
import CourseContent from './CourseContent'
import TotalExercises from './TotalExercises';


const Course = ({course})=>{
    return (
        <div>
            <CourseHeader name={course.name}/>
            <CourseContent parts={course.parts}/>
            <TotalExercises parts={course.parts}/>
        </div>

        
)};

export default Course
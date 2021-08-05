import React, { Component, Fragment, useState } from 'react'

const Notification = ({message})=>{
        if (!message){
            return null
        }
        return(
            <div className="error">
                {message}
            </div>
        )
};

export default Notification
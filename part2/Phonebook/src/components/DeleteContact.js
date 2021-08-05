import React, { Component, Fragment, useState } from 'react'

const DeleteContact = ({deleteReq})=>{
    return (
        <button onClick={deleteReq}> Delete </button>
)};

export default DeleteContact
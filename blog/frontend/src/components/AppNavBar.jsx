import React from 'react'
import { Link } from 'react-router-dom'

const AppNavBar = (props) => {
  return (
    <div>
      {' '}
      <Link to="/users"> Users </Link>{' '}
    </div>
  )
}

export default AppNavBar

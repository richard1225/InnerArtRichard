import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-danger" style={{ height: 60 }}>
      <h3 style={{ marginLeft: '20px', marginBottom: '20px', color: 'white' }}>
        <i className={icon} />
        <b style={{ marginLeft: '20px', marginBottom: '20px' }}>{title}</b>
      </h3>

      <SearchBox></SearchBox>

      <ul>
        <li>
          <Link to="/register">
            {' '}
            <h4>Register</h4>
          </Link>
        </li>
        <br></br>
        <li>
          <Link to="/login">
            {' '}
            <h4>Login</h4>
          </Link>
        </li>
      </ul>
    </div>
  )
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}
Navbar.defaultProps = {
  title: ' Inner Art',
  icon: 'fas fa-pen-fancy'
}

export default Navbar

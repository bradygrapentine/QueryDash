import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

// Probably integrate these features into landing page

export function AccountPage() {
  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="main"></main>
      <footer className="standardFooter">
        <Link to="/" className="standardFooter">
          Home
        </Link>
        <Link to="/about" className="standardFooter">
          About
        </Link>
        <Link to="/create-dash" className="standardFooter">
          Create Dash{' '}
        </Link>
        {/* <a href="https://www.google.com/" className="footer">
      Contact
    </a> */}
      </footer>
    </>
  )
}

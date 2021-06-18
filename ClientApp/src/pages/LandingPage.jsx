import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

export function LandingPage() {
  return (
    // <>
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="landingPageContainer">
        <div className="listOfDashes">
          <h3 className="HeaderDashList">Preset Dashes</h3>
          <ul className="DisplayListDash">
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
          </ul>
        </div>
        <div className="listOfDashes">
          <h3 className="HeaderDashList">User Dashes</h3>
          <ul className="DisplayListDash">
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash" className="">
                DashPage
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/create-account" className="navLink">
          Sign Up
        </Link>
        <Link to="/about" className="navLink">
          About
        </Link>
        <Link to="/account" className="navLink">
          Account
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
        </Link>
        {/* <a href="https://www.google.com/" className="footer">
        Contact
      </a> */}
      </footer>
    </>
  )
}

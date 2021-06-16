import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

export function LandingPage() {
  return (
    // <>
    <>
      <h2 className="LandingPageHeader">QueryDash</h2>
      <main className="landingPageContainer">
        <div className="listOfDashes">
          <h3 className="HeaderDashList">Preset Dashes</h3>
          <ul className="DisplayListDash">
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
          </ul>
        </div>
        <div className="listOfDashes">
          <h3 className="HeaderDashList">User Dashes</h3>
          <ul className="DisplayListDash">
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
            <li>
              <Link to="/dash-page" className="">
                DashPage
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/create-account" className="standardFooter">
          Sign Up
        </Link>
        <Link to="/about" className="standardFooter">
          About
        </Link>
        <Link to="/account" className="standardFooter">
          Account
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

import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateDashPage() {
  return (
    <>
      <Link to="/">
        <h2 className="LandingPageHeader">QueryDash</h2>
      </Link>
      <button className="accountInfoSubmit">Create Dash</button>
      {/* <h2 className="LandingPageHeader">Create Dash</h2> */}
      <main className="mainCreateAccount">
        {/* <p className="tbd"> Under Construction</p> */}
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="createAccountPageFooter">
        <Link to="/create-account" className="standardFooter">
          Sign Up
        </Link>
        <Link to="/about" className="standardFooter">
          About
        </Link>
        <Link to="/account" className="standardFooter">
          Account
        </Link>
        <Link to="/" className="standardFooter">
          Home
        </Link>
        {/* <a href="https://www.google.com/" className="footer">
        Contact
      </a> */}
      </footer>
    </>
  )
}
